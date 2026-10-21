import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const dynamic = 'force-static';

export async function GET() {
  const logo = await readFile(join(process.cwd(), 'public', 'whitetextbrandname.png'));
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', background: '#16191c', color: '#fff', padding: '64px', borderBottom: '12px solid #b49351' }}>
      {/* ImageResponse renders this image into a PNG, rather than a browser element. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${logo.toString('base64')}`} alt="" width={360} height={121} style={{ objectFit: 'contain' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '62px', fontWeight: 700, lineHeight: 1.1 }}><span>Construction materials.</span><span>Dependable supply.</span></div>
        <div style={{ fontSize: '28px', color: '#d6bb80' }}>Cement · Sand · Aggregates · Saveto</div>
      </div>
      <div style={{ fontSize: '24px', color: '#c1c1c1' }}>Dammam, Saudi Arabia · mahalforethayat.com</div>
    </div>,
    { width: 1200, height: 630, headers: { 'Cache-Control': 'public, max-age=86400' } },
  );
}
