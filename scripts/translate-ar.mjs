import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const output = path.resolve('public/translations/ar.json');
const normalize = text => text.replace(/&amp;/g, '&').replace(/&apos;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const contentKeys = new Set(['name', 'title', 'description', 'label', 'action', 'alt', 'summary', 'note', 'unit', 'caption', 'location', 'role', 'heading', 'subtitle', 'eyebrow', 'placeholder', 'aria-label', 'aria-description', 'address']);
const ignoredAttributes = new Set(['className', 'href', 'src', 'id', 'key', 'type', 'role', 'style', 'sizes', 'loading', 'rel', 'target', 'lang', 'dir', 'd', 'fill', 'stroke', 'aria-controls', 'aria-labelledby', 'aria-describedby']);
const codeStrings = new Set(['End', 'Enter', 'Escape', 'contact', 'email', 'group', 'img', 'phone', 'products', 'requirements', 'source', 'status', 'tab', 'tablist', 'tabpanel', 'website', '⌘K']);

export async function collectTexts() {
  const texts = new Set();
  async function walk(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(filename);
      else if (/\.tsx?$/.test(entry.name) && !/Language|social-links|translation-text/.test(entry.name)) {
        const source = ts.createSourceFile(filename, await fs.readFile(filename, 'utf8'), ts.ScriptTarget.Latest, true, filename.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
        const add = value => {
          const text = normalize(value);
          if (codeStrings.has(text)) return;
          if (/[a-zA-Z]/.test(text) && text.length > 1 && !/https?:|^\/|^[\w.-]+@[\w.-]+|[{}<>\\]|^M\d|^use client$|^a, button, input$|^noopener noreferrer$|^construction-intro-exiting$|^floor self |^insuwrap slurry |^repair grout |^tile bond |^vetonit render |^\((?:min-width|prefers-reduced-motion):|\b(?:bg-|text-|px-|py-|w-|h-|focus-visible:|flex-|grid-|border-|rounded-|sm:|md:|lg:)/.test(text)) texts.add(text);
        };
        function visit(node) {
          if (ts.isJsxText(node)) add(node.text);
          if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
            const parent = node.parent;
            if (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent) || (ts.isPropertyAssignment(parent) && parent.name === node)) return;
            if (ts.isJsxAttribute(parent)) {
              if (contentKeys.has(parent.name.getText(source))) add(node.text);
            } else if (ts.isJsxExpression(parent) && ts.isJsxAttribute(parent.parent) && ignoredAttributes.has(parent.parent.name.getText(source))) {
              return;
            } else if (ts.isPropertyAssignment(parent) && contentKeys.has(parent.name.getText(source).replace(/['"]/g, ''))) add(node.text);
            else if (/\s/.test(node.text) || /^[A-Z][a-z]+$/.test(node.text) || /^[a-z]+[.!?]$/.test(node.text) || ts.isJsxExpression(parent)) add(node.text);
          }
          ts.forEachChild(node, visit);
        }
        visit(source);
      }
    }
  }
  for (const directory of ['app', 'components', 'lib']) await walk(directory);
  // Include descriptions and sizes assembled from product data at runtime.
  const require = createRequire(import.meta.url);
  const previousLoader = require.extensions['.ts'];
  require.extensions['.ts'] = (module, filename) => {
    const code = ts.transpileModule(require('node:fs').readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
    module._compile(code, filename);
  };
  try {
    const { allOverviews } = require('../lib/products.ts');
    for (const product of allOverviews) {
      for (const text of [product.name, product.category, product.description, ...product.uses, ...product.features, ...product.facts.flat()]) {
        if (/[A-Za-z]/.test(text) && !/^[A-Z\d-]+$/.test(text)) texts.add(normalize(text));
      }
      texts.add(normalize(product.name.replace(/^Saveto Tile Grout — /, '').replace(/^Saveto Antibacterial Grout — /, '').replace(/^Saveto /, '').replace(/^Vetonit /, '')));
    }
  } finally { require.extensions['.ts'] = previousLoader; }
  return [...texts].sort();
}

export function readTranslations(body, expected) {
  const result = Array.isArray(body) ? body : body.translations ?? body.translatedTexts ?? body.data ?? body.result;
  if (!Array.isArray(result) || result.length !== expected) throw new Error(`OpenL returned an unexpected translation count: ${JSON.stringify(body).slice(0,500)}. This batch was not saved.`);
  return result.map(item => {
    const text = typeof item === 'string' ? item : item.translatedText ?? item.translated_text ?? item.translation ?? item.text;
    if (typeof text !== 'string' || !text.trim()) throw new Error('OpenL returned an empty translation. No translations were saved.');
    return text;
  });
}

async function main() {
  try { process.loadEnvFile?.('.env.local'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const texts = await collectTexts();
  let saved = {};
  try { saved = JSON.parse(await fs.readFile(output, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const missing = texts.filter(text => !saved[text]);
  console.log(`${texts.length} unique site strings; ${missing.length} uncached (${missing.reduce((count, text) => count + text.length, 0)} characters).`);
  if (process.argv.includes('--dry-run')) {
    await fs.writeFile('scripts/.translations-source.json', JSON.stringify(texts, null, 2) + '\n');
    return;
  }
  if (!missing.length) { console.log('All content is cached. No OpenL requests needed.'); return; }
  const key = process.env.OPENL_RAPIDAPI_KEY;
  if (!key) throw new Error('Set OPENL_RAPIDAPI_KEY in .env.local before generating translations.');
  await fs.mkdir(path.dirname(output), { recursive: true });
  const lockPath = path.resolve('scripts/.translation.lock');
  const lock = await fs.open(lockPath, 'wx').catch(() => { throw new Error('Another translation job is running. If interrupted, remove scripts/.translation.lock before resuming.'); });
  try {
  for (let offset = 0; offset < missing.length;) {
    const batch = [];
    let characters = 0;
    while (offset < missing.length && batch.length < 3 && characters + missing[offset].length < 4500) {
      characters += missing[offset].length;
      batch.push(missing[offset++]);
    }
    if (!batch.length) throw new Error('A source string exceeds the batch character limit.');
    const response = await fetch('https://mcp.rapidapi.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'x-api-host': 'openl-translate.p.rapidapi.com', 'x-api-key': key },
      body: JSON.stringify({ jsonrpc: '2.0', id: offset, method: 'tools/call', params: { name: 'Bulk_translate_text', arguments: { target_lang: 'ar', text: batch } } }),
      signal: AbortSignal.timeout(60000),
    });
    if (!response.ok) throw new Error(`OpenL request failed (${response.status}). Saved batches are retained; no automatic retry or repeated charges.`);
    const envelope = await response.json();
    if (envelope.error || envelope.result?.isError) throw new Error('OpenL could not translate this batch. Saved translations are retained. Check your account quota and API configuration.');
    const content = envelope.result?.content?.find(item => item.type === 'text')?.text;
    if (!content) throw new Error('OpenL returned no text result. Saved translations are retained.');
    const body = JSON.parse(content);
    if (body.error) throw new Error(`OpenL: ${body.error}. Saved translations are retained; no automatic retry.`);
    const translations = readTranslations(body, batch.length);
    batch.forEach((text, index) => { saved[text] = translations[index]; });
    const temporary = `${output}.tmp`;
    await fs.writeFile(temporary, JSON.stringify(saved, null, 2) + '\n');
    await fs.rename(temporary, output);
    console.log(`Saved ${offset}/${missing.length} new translations (${characters} characters in this batch).`);
  }
  } finally { await lock.close(); await fs.unlink(lockPath); }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
