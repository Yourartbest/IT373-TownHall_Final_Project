import site from './site.js'

// Fetch upcoming events from Sanity
export default async function () {
  try {
    const events = await site.sanity.fetch(`
      *[_type == "event" && date >= now()] | order(date asc)[0...3] {
        _id,
        title,
        "slug": slug.current,
        description,
        date,
        location,
        difficultyLevel,
        audienceTag,
        whatYouWillLearn,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        registrationOpen
      }
    `)
    return events || []
  } catch (error) {
    console.warn('Could not fetch events from Sanity:', error.message)
    return []
  }
}
