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
  webhookUrl: 'https://hook.us2.make.com/vn41m5vw3xu73monp6u3la4q9v7f91oy',
  sanity: client
}
