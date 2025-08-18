// app/sitemap.js
export default function sitemap() {
  const base = 'https://elitecoatinteriors.co.uk';
  return [
    { url: `${base}/`, lastModified: new Date() },
    // când adaugi pagini noi, le pui aici
  ];
}
