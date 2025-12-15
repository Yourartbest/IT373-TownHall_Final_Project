import site from './site.js'

// Fetch ALL events from Sanity for pagination
export default async function () {
  try {
    const events = await site.sanity.fetch(`
      *[_type == "event"] | order(date asc) {
        _id,
        title,
        "slug": slug.current,
        description,
        fullDescription,
        date,
        location,
        difficultyLevel,
        audienceTag,
        whatYouWillLearn,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        registrationOpen,
        maxAttendees,
        hubspotFormId
      }
    `)
    return events || []
  } catch (error) {
    console.warn('Could not fetch all events from Sanity:', error.message)
    return []
  }
}
