import { boqExtensions, maxBoqBytes } from '@/lib/home-content';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: 'This inquiry must be submitted from the website.' }, { status: 403 });
  }
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.startsWith('multipart/form-data;')) return Response.json({ error: 'Invalid submission format.' }, { status: 400 });
  const maxContactBytes = 25 * 1024 * 1024;
  const maxBody = maxContactBytes + 64 * 1024;
  const reader = request.body?.getReader();
  if (!reader) return Response.json({ error: 'An inquiry is required.' }, { status: 400 });
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBody) {
        await reader.cancel();
        return Response.json({ error: 'The attachment must be no larger than 25 MB.' }, { status: 413 });
      }
      chunks.push(value);
    }
    const form = await new Response(Buffer.concat(chunks), { headers: { 'content-type': contentType } }).formData();
    if (form.get('website')) return Response.json({ error: 'Unable to process this inquiry.' }, { status: 400 });
    const fields: Record<string, string> = {};
    const isContact = form.get('source') === 'contact';
    for (const [key, limit] of Object.entries({ company: 150, contact: 100, phone: 30, email: 200, location: 300, requirements: 5000 })) {
      const value = form.get(key);
      if (typeof value !== 'string' || value.trim().length > limit || (key !== 'location' && !value.trim())) return Response.json({ error: `Please provide valid ${key} details.` }, { status: 400 });
      fields[key] = value.trim();
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || !/^[+\d\s().-]{7,30}$/.test(fields.phone) || form.get('consent') !== 'yes') return Response.json({ error: 'Please check your email, phone number and contact consent.' }, { status: 400 });
    if (isContact) {
      const purpose = form.get('purpose');
      const family = form.get('productFamily');
      const families = ['Tile fixing & grouting', 'Waterproofing & membranes', 'Concrete repair & precision grouts', 'Plasters, renders & masonry', 'Flooring systems', 'Bonding agents & construction chemicals', 'Multiple systems / selection assistance'];
      if (typeof purpose !== 'string' || !['quote', 'technical', 'account'].includes(purpose) || typeof family !== 'string' || !families.includes(family)) return Response.json({ error: 'Select an inquiry purpose and product focus area.' }, { status: 400 });
      fields.purpose = purpose;
      fields.productFamily = family;
    }

    let attachment = null;
    const file = form.get('boq');
    if (file instanceof File && file.size > 0) {
      const allowed = isContact ? /\.(pdf|xlsx|xls|docx)$/i : boqExtensions;
      if (!allowed.test(file.name) || file.size > (isContact ? maxContactBytes : maxBoqBytes)) return Response.json({ error: isContact ? 'Attach a PDF, Excel or DOCX file no larger than 25 MB.' : 'Attach a PDF or Excel file no larger than 10 MB.' }, { status: 400 });
      const bytes = Buffer.from(await file.arrayBuffer());
      const extension = file.name.split('.').pop()?.toLowerCase();
      const validSignature = extension === 'pdf' ? bytes.subarray(0, 5).toString() === '%PDF-' : extension === 'xlsx' || extension === 'docx' ? bytes[0] === 0x50 && bytes[1] === 0x4b : bytes.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
      if (!validSignature) return Response.json({ error: 'The attached file does not match its declared document format.' }, { status: 400 });
      attachment = { filename: file.name.replace(/[\r\n/\\]/g, '_').slice(0, 200), contentType: extension === 'pdf' ? 'application/pdf' : extension === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : extension === 'xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/vnd.ms-excel', size: file.size, base64: bytes.toString('base64') };
    }
    const endpoint = process.env.QUOTE_WEBHOOK_URL;
    if (!endpoint) return Response.json({ error: 'Online quote delivery is not connected yet. Save a local copy of your inquiry; your request has not been sent.' }, { status: 503 });
    if (new URL(endpoint).protocol !== 'https:') return Response.json({ error: 'Quote delivery is temporarily unavailable. Your request has not been sent.' }, { status: 503 });
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(process.env.QUOTE_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.QUOTE_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify({ ...fields, attachment, consent: true, submittedAt: new Date().toISOString(), source: isContact ? 'contact' : 'website' }),
      signal: AbortSignal.timeout(15000),
      redirect: 'error',
    });
    if (!response.ok) return Response.json({ error: 'Quote delivery is temporarily unavailable. Please retry or save a local copy.' }, { status: 502 });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Unable to process your inquiry. Please check the file and retry, or save a local copy.' }, { status: 400 });
  }
}
