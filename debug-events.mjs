import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'ajcjdayi',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-12-10'
})

async function debugEvents() {
  console.log('🔍 Debugging event data...\n')

  // Check all events
  const allEvents = await client.fetch(`
    *[_type == "event"] | order(date asc) {
      _id,
      title,
      "slug": slug.current,
      date
    }
  `)
  
  console.log(`Total events in Sanity: ${allEvents.length}\n`)
  
  allEvents.forEach(event => {
    const eventDate = new Date(event.date)
    const now = new Date()
    const isFuture = eventDate > now
    
    console.log(`📅 ${event.title}`)
    console.log(`   Date: ${eventDate.toLocaleString()}`)
    console.log(`   Now:  ${now.toLocaleString()}`)
    console.log(`   Future: ${isFuture ? '✅ YES' : '❌ NO (past event)'}\n`)
  })

  // Check upcoming events (same query as events.js)
  const upcomingEvents = await client.fetch(`
    *[_type == "event" && date >= now()] | order(date asc)[0...3] {
      _id,
      title,
      date
    }
  `)

  console.log(`\n📊 Upcoming events query result: ${upcomingEvents.length} events`)
  upcomingEvents.forEach(event => {
    console.log(`   - ${event.title}`)
  })
}

debugEvents().catch(console.error)
