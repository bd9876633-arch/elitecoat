// app/sitemap.js
export default function sitemap() {
  const base = 'https://www.elitecoatinteriors.co.uk'
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
