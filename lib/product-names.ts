export function productName(name: string) {
  return name.replace(/^(?:(?:Saveto|Vetonit|Riyadh|Saudi|Eastern)\s+)+/i, '').trim();
}

export function arabicProductName(name: string) {
  return name
    .replace(/(^|\s)(?:من\s+)?(?:سافيتو|فيتونيت|الرياض|السعودية|الشرقية)(?=\s|$)/gu, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}
