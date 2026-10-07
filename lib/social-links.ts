export const socialLinks = [
  { name: 'Facebook', href: process.env.NEXT_PUBLIC_FACEBOOK_URL },
  { name: 'Instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  { name: 'TikTok', href: process.env.NEXT_PUBLIC_TIKTOK_URL },
  { name: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
  { name: 'YouTube', href: process.env.NEXT_PUBLIC_YOUTUBE_URL },
].map(link => {
  let href = '#footer-social';
  try {
    if (link.href && new URL(link.href).protocol === 'https:') href = link.href;
  } catch {
    // Keep the footer placeholder until a valid profile is configured.
  }
  return { name: link.name, href };
});
