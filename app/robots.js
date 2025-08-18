// app/robots.js
export default function robots() {
  const baseUrl = 'https://elitecoatinteriors.co.uk';
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
