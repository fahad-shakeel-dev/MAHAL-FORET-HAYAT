export const runtime = 'nodejs';

const formspreeEndpoint = 'https://formspree.io/f/xbgdkzkj';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: 'This inquiry must be submitted from the website.' }, { status: 403 });
  }
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.startsWith('multipart/form-data;')) return Response.json({ error: 'Invalid submission format.' }, { status: 400 });
  const reader = request.body?.getReader();
  if (!reader) return Response.json({ error: 'A message is required.' }, { status: 400 });
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 64 * 1024) {
        await reader.cancel();
        return Response.json({ error: 'Your message is too long. Please shorten it and try again.' }, { status: 413 });
      }
      chunks.push(value);
    }
    const form = await new Response(Buffer.concat(chunks), { headers: { 'content-type': contentType } }).formData();
    if (form.get('website')) return Response.json({ error: 'Unable to process this inquiry.' }, { status: 400 });
    const fields: Record<string, string> = {};
    for (const [key, limit] of Object.entries({ contact: 100, phone: 30, email: 200, requirements: 5000 })) {
      const value = form.get(key) ?? '';
      if (typeof value !== 'string' || value.trim().length > limit || (key !== 'email' && !value.trim())) return Response.json({ error: 'Please enter your name, phone number and message.' }, { status: 400 });
      fields[key] = value.trim();
    }
    if (!/^[+\d\s().-]{7,30}$/.test(fields.phone)) return Response.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return Response.json({ error: 'Please check your email address, or leave it empty.' }, { status: 400 });
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: fields.contact,
        phone: fields.phone,
        ...(fields.email ? { email: fields.email } : {}),
        message: fields.requirements,
        source: form.get('source') === 'contact' ? 'contact' : 'website',
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(15000),
      redirect: 'error',
    });
    if (!response.ok) return Response.json({ error: 'We could not send your message. Please use WhatsApp or try again later.' }, { status: 502 });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Unable to send your message. Please try again or use WhatsApp.' }, { status: 400 });
  }
}
