import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// A dependency-free, single-page PDF. Regenerate after approving the business copy.
const commands = [];
const escape = (text) => text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
const rectangle = (x, y, width, height, color) => commands.push(`${color} rg ${x} ${y} ${width} ${height} re f`);
const text = (value, x, y, size = 11, color = '0.28 0.34 0.41', bold = false) => commands.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf ${color} rg 1 0 0 1 ${x} ${y} Tm (${escape(value)}) Tj ET`);
rectangle(0, 690, 595, 152, '0.04 0.09 0.15');
text('MAHAL FORET HAYAT', 42, 789, 24, '1 1 1', true);
text('Construction materials | Company profile', 42, 757, 13, '0.35 0.78 0.95');
text('DRAFT - BUSINESS DETAILS AWAITING CONFIRMATION', 42, 718, 9, '0.75 0.81 0.87');

const sections = [
  ['OUR ROLE', ['Material selection, technical document requests and bulk procurement', 'planning for construction projects. Availability and delivery are', 'confirmed against the selected products and site requirements.']],
  ['MANUFACTURER PORTFOLIO', ['Explore Saveto and Vetonit material systems and Insuwrap waterproofing.', 'Product brands are identified for reference.', 'MAHAL FORET HAYAT is presented as an independent company.']],
  ['APPLICATION FAMILIES', ['Tiling and grouting | Waterproofing and protective coatings', 'Concrete repair and grouts | Plasters, renders and facade finishes', 'Flooring preparation and finishing systems']],
  ['PROCUREMENT & DELIVERY', ['Discuss product quantities, palletized orders and staged site deliveries.', 'Warehouse footprint, storage conditions, fleet equipment, service radius', 'and dispatch times must be confirmed before an order is finalized.']],
  ['QUALITY & DOCUMENTATION', ['Request current product TDS, SDS, application guidance and applicable', 'test evidence. Product-specific requirements do not establish blanket', 'certification. Request project-specific documentation from our team.']],
  ['CONTRACTOR INQUIRIES', ['Provide company name, contact details, product quantities, site location', 'and a PDF or Excel BOQ through the website inquiry form.', 'Contractor accounts and credit terms are subject to approval.']],
];
let y = 653;
for (const [heading, lines] of sections) {
  text(heading, 42, y, 10, '0.02 0.42 0.64', true);
  lines.forEach((line, index) => text(line, 42, y - 21 - index * 16, 10.5));
  y -= 93;
}
rectangle(42, 72, 511, 1, '0.8 0.85 0.89');
text('Sales contacts, office/warehouse addresses and territories: to be confirmed.', 42, 55, 9);
text('MAHAL FORET HAYAT | Construction material solutions', 42, 39, 8);
text('Company overview | Contact our team for project information.', 42, 23, 8);

const content = commands.join('\n');
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
];
let pdf = '%PDF-1.4\n';
const offsets = [0];
objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
pdf += offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`).join('');
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
writeFileSync(fileURLToPath(new URL('../public/company-profile.pdf', import.meta.url)), pdf);
console.log('Generated public/company-profile.pdf');
