// app/sitemap.js
export const dynamic = 'force-static'; // îl face static, fără surprize

export default function sitemap() {
  const base = 'https://www.elitecoatinteriors.co.uk'; // cu www!
  const now = new Date().toISOString();

  return [
    { url: `${base}/`, lastModified: now },
    // când ai pagini noi, le adaugi aici
  ];
}
