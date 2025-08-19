// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.elitecoatinteriors.co.uk'  // domeniul final, cu www

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // adaugi aici alte pagini când ai nevoie
  ]
}
