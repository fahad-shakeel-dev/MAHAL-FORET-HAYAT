const indexes = new WeakMap<Record<string, string>, Map<string, string>>();

export function translateText(source: string, dictionary: Record<string, string>): string {
  const normalized = source.replace(/\s+/g, ' ').trim();
  if (!normalized || !/[a-zA-Z]/.test(normalized)) return source;
  let index = indexes.get(dictionary);
  if (!index) { index = new Map(Object.entries(dictionary).map(([key, value]) => [key.toLowerCase(), value])); indexes.set(dictionary, index); }
  const exact = (value: string) => dictionary[value] ?? index.get(value.toLowerCase()) ?? value;
  let translated = dictionary[normalized] ?? index.get(normalized.toLowerCase());
  if (!translated) {
    const showing = normalized.match(/^Showing (\d+[–-]\d+) of (\d+) products$/);
    const overview = normalized.match(/^View (.+) overview$/);
    const title = normalized.match(/^(.+) \| MAHAL FORET HAYAT$/);
    const brand = normalized.match(/^MAHAL FORET HAYAT on (.+)$/);
    const category = normalized.match(/^(.+) (categories|products)$/);
    const inquiry = normalized.match(/^Ask about (.+)$/);
    const slide = normalized.match(/^(\d+) of (\d+): (.+)$/);
    const image = normalized.match(/^Enlarge (.+) image$/);
    const documentRequest = normalized.match(/^(.+) for (.+)$/);
    const quote = normalized.match(/^Please quote for (.+)\.$/);
    if (showing) translated = `عرض ${showing[1]} من ${showing[2]} منتج`;
    else if (overview) translated = `عرض نبذة ${exact(overview[1])}`;
    else if (title) translated = `${exact(title[1])} | محل فورت حيات`;
    else if (brand) translated = `محل فورت حيات على ${brand[1]}`;
    else if (category) translated = `${category[2] === 'categories' ? 'فئات' : 'منتجات'} ${exact(category[1])}`;
    else if (inquiry) translated = `استفسر عن ${exact(inquiry[1])}`;
    else if (slide) translated = `${slide[1]} من ${slide[2]}: ${exact(slide[3])}`;
    else if (image) translated = `تكبير صورة ${exact(image[1])}`;
    else if (quote) translated = `يرجى تقديم عرض سعر لـ ${exact(quote[1])}.`;
    else if (documentRequest && exact(documentRequest[1]) !== documentRequest[1] && exact(documentRequest[2]) !== documentRequest[2]) translated = `${exact(documentRequest[1])} لـ ${exact(documentRequest[2])}`;
  }
  if (!translated) return source;
  const leading = source.match(/^\s*/)?.[0] ?? '';
  const trailing = source.match(/\s*$/)?.[0] ?? '';
  return leading + translated + trailing;
}
