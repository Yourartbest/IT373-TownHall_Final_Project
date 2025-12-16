import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ajcjdayi',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-12-10'
})

export default {
  url: 'https://newark-ai-townhall.netlify.app',
  title: 'Newark AI Town Hall',
  description:
    'Making AI education accessible, plain-language, and community-centered for Newark residents.',
  author: 'Newark AI Community',
  sanity: client,
  // Configure your Make.com webhook URL here
  // For static deployments (GitHub Pages/Netlify), client-side envs are bundled.
  // Prefer setting MAKE_WEBHOOK_URL in build env. If not set, fallback to the provided URL.
  webhookUrl: process.env.MAKE_WEBHOOK_URL || 'https://hook.us2.make.com/vn41m5vw3xu73monp6u3la4q9v7f91oy'
}
