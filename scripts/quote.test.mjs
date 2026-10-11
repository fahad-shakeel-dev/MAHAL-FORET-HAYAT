import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const code = ts.transpileModule(fs.readFileSync('app/api/quote/route.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function handler(fetch) {
  const context = { exports: {}, Buffer, Response, URL, AbortSignal, fetch };
  vm.runInNewContext(code, context);
  return context.exports.POST;
}

function request(values = {}, origin = 'https://www.mahalforethayat.com') {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    contact: 'Test visitor', phone: '+966510000000', email: 'visitor@example.com',
    requirements: 'Please quote construction materials.', source: 'contact', ...values,
  })) form.set(key, value);
  return new Request('https://www.mahalforethayat.com/api/quote', {
    method: 'POST', body: form, headers: { origin },
  });
}

test('forwards a contact inquiry to the supplied Formspree endpoint', async () => {
  let calls = 0;
  const post = handler(async (url, options) => {
    calls++;
    assert.equal(url, 'https://formspree.io/f/xbgdkzkj');
    assert.equal(options.method, 'POST');
    assert.equal(options.headers.Accept, 'application/json');
    assert.equal(options.headers.Authorization, undefined);
    const payload = JSON.parse(options.body);
    assert.equal(payload.name, 'Test visitor');
    assert.equal(payload.phone, '+966510000000');
    assert.equal(payload.email, 'visitor@example.com');
    assert.equal(payload.message, 'Please quote construction materials.');
    assert.equal(payload.source, 'contact');
    assert.ok(!Number.isNaN(Date.parse(payload.submittedAt)));
    return Response.json({ ok: true });
  });
  const result = await post(request());
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { success: true });
  assert.equal(calls, 1);
});

test('website inquiries allow an omitted optional reply email', async () => {
  const post = handler(async (_url, options) => {
    const payload = JSON.parse(options.body);
    assert.equal(payload.source, 'website');
    assert.equal(Object.hasOwn(payload, 'email'), false);
    return Response.json({ ok: true });
  });
  assert.equal((await post(request({ email: '', source: 'website' }))).status, 200);
});

test('Formspree rejection never reports a successful submission', async () => {
  const post = handler(async () => Response.json({ errors: [{ message: 'Rejected' }] }, { status: 422 }));
  const result = await post(request());
  assert.equal(result.status, 502);
  assert.ok((await result.json()).error);
});

test('network failure returns an error for the visitor to retry', async () => {
  const post = handler(async () => { throw new Error('Network unavailable'); });
  const result = await post(request());
  assert.ok(result.status >= 400);
  assert.ok((await result.json()).error);
});

test('invalid fields and honeypot submissions never reach Formspree', async () => {
  let calls = 0;
  const post = handler(async () => { calls++; return Response.json({ ok: true }); });
  for (const values of [{ contact: '' }, { phone: 'invalid' }, { email: 'invalid' }, { requirements: '' }, { website: 'spam' }]) {
    assert.equal((await post(request(values))).status, 400);
  }
  assert.equal(calls, 0);
});

test('cross-origin and oversized submissions never reach Formspree', async () => {
  let calls = 0;
  const post = handler(async () => { calls++; return Response.json({ ok: true }); });
  assert.equal((await post(request({}, 'https://other.example.com'))).status, 403);
  assert.equal((await post(request({ requirements: 'x'.repeat(66000) }))).status, 413);
  assert.equal(calls, 0);
});
