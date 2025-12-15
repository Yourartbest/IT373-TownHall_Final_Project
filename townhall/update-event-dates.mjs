import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'ajcjdayi',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN || '',
  apiVersion: '2024-12-10'
})

async function updateEventDates() {
  console.log('🔄 Updating event dates to 2025...\n')

  try {
    const events = await client.fetch(`*[_type == "event"] { _id, title, date }`)
    
    console.log(`Found ${events.length} events to update\n`)

    for (const event of events) {
      const oldDate = new Date(event.date)
      const newDate = new Date(oldDate)
      newDate.setFullYear(2025)

      await client.patch(event._id)
        .set({ date: newDate.toISOString() })
        .commit()

      console.log(`✅ Updated "${event.title}"`)
      console.log(`   Old: ${oldDate.toLocaleDateString()}`)
      console.log(`   New: ${newDate.toLocaleDateString()}\n`)
    }

    console.log('🎉 All event dates updated to 2025!')
  } catch (error) {
    console.error('Error:', error)
  }
}

updateEventDates()
