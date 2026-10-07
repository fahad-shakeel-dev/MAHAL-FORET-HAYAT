import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import ts from 'typescript';
import { createRequire } from 'node:module';
import { collectTexts, readTranslations } from './translate-ar.mjs';

const source = fs.readFileSync('lib/translation-text.ts', 'utf8');
const javascript = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const exports = {};
new Function('exports', javascript)(exports);
const { translateText } = exports;
const dictionary = JSON.parse(fs.readFileSync('public/translations/ar.json', 'utf8'));

test('saved Arabic covers the collected site and generated product content', async () => {
  const missing = (await collectTexts()).filter(text => !dictionary[text]);
  assert.deepEqual(missing, []);
});
test('whitespace, numbers, product codes and unknown input remain intact', () => {
  assert.equal(translateText('  Home\n', dictionary), '  الرئيسية\n');
  assert.equal(translateText('T081S', dictionary), 'T081S');
  assert.equal(translateText('30', dictionary), '30');
  assert.equal(translateText('Customer-written message', dictionary), 'Customer-written message');
});
test('dynamic catalog counts and page titles retain their values', () => {
  assert.equal(translateText('Showing 1–6 of 82 products', dictionary), 'عرض 1–6 من 82 منتج');
  assert.equal(translateText('Cement | MAHAL FORET HAYAT', dictionary), 'الأسمنت | محل فورت حيات');
});
test('Arabic matching accepts translated names and categories', () => {
  const require = createRequire(import.meta.url);
  const previousLoader = require.extensions['.ts'];
  require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText, filename);
  try {
    const { searchProducts } = require('../lib/product-search.ts');
    assert.ok(searchProducts('الأسمنت').some(product => product.categoryId === 'cement'));
    assert.ok(searchProducts('رمل مغسول').some(product => product.slug === 'washed-sand'));
    assert.ok(searchProducts('Saveto').length > 0);
  } finally { require.extensions['.ts'] = previousLoader; }
});
test('provider results must be complete before a batch is saved', () => {
  assert.deepEqual(readTranslations({ translatedTexts: ['الرئيسية', 'من نحن'] }, 2), ['الرئيسية', 'من نحن']);
  assert.throws(() => readTranslations({ translatedTexts: ['الرئيسية'] }, 2));
  assert.throws(() => readTranslations({ translatedTexts: [''] }, 1));
  assert.throws(() => readTranslations({ message: 'Quota exceeded' }, 1));
});
