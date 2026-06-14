import type { MetadataRoute } from 'next'
import { industries } from '@/content/industries'

const baseUrl = 'https://datenpflege-nord.de'

export default function sitemap(): MetadataRoute.Sitemap {
  const industryEntries: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${baseUrl}/branchen/${industry.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/quickcheck`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/leistungen`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/leistungen/bfsg-signalcheck`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/leistungen/pflichten-check`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/leistungen/ki-bueroautomation`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/monitoring`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/branchen`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...industryEntries,
    {
      url: `${baseUrl}/kontakt`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ueber-uns`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
