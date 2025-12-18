import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ajcjdayi',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-12-10'
})

const HUBSPOT_WEBHOOK = 'https://hook.us2.make.com/w1i6g1supphcapiwfqgwsms5j1ae1x6m'
const BASE_URL = 'https://yourartbest.github.io/IT373-TownHall_Final_Project'

async function syncEventsToHubSpot() {
  try {
    console.log('Fetching active events from Sanity...')
    
    const events = await client.fetch(`
      *[_type == "event" && registrationOpen == true] | order(eventDate asc) {
        title,
        "slug": slug.current,
        eventDate,
        registrationOpen,
        maxAttendees
      }
    `)

    console.log(`Found ${events.length} active events`)

    if (events.length === 0) {
      console.log('No active events to sync')
      return
    }

    for (const event of events) {
      const eventData = {
        title: event.title,
        url: `${BASE_URL}/events/${event.slug}/`,
        date: event.eventDate,
        maxAttendees: event.maxAttendees
      }

      console.log(`Sending event: ${eventData.title}`)
      console.log(`URL: ${eventData.url}`)

      const response = await fetch(HUBSPOT_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      })

      if (response.ok) {
        console.log(`✓ Successfully sent: ${eventData.title}`)
      } else {
        console.error(`✗ Failed to send ${eventData.title}: ${response.status} ${response.statusText}`)
      }

      await new Promise(resolve => setTimeout(resolve, 500))
    }

    console.log('\nSync complete!')
    console.log(`Total events sent: ${events.length}`)

  } catch (error) {
    console.error('Error syncing events:', error)
    process.exit(1)
  }
}

syncEventsToHubSpot()
