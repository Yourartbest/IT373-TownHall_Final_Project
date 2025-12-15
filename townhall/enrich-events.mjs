import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ajcjdayi',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-12-10',
  token: process.env.SANITY_API_TOKEN,
})

const eventDetails = {
  'ai-basics-for-parents': {
    fullDescription: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This workshop is designed specifically for parents who want to understand AI technology and how it affects their children. We will cover the basics of artificial intelligence in plain language, discuss real-world AI applications your kids encounter daily, and provide practical strategies for having meaningful conversations about AI at home.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Learn how AI is used in apps, games, and educational tools. Understand the privacy implications and how to guide your children in using AI responsibly. This is a judgment-free, beginner-friendly environment where all questions are welcome.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    whatYouWillLearn: [
      'What AI is and how it works in simple terms',
      'Common AI tools children encounter in apps and games',
      'Privacy and safety considerations for families',
      'How to talk to your kids about AI technology',
      'Practical tips for setting healthy AI boundaries at home',
    ],
    location: 'Newark Public Library, Main Branch',
    maxAttendees: 30,
  },
  'teaching-ai-literacy': {
    fullDescription: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Calling all educators! This professional development workshop will equip you with practical strategies for integrating AI literacy into your curriculum. Whether you teach elementary, middle, or high school, you will learn age-appropriate ways to introduce AI concepts to your students.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We will explore ready-to-use lesson plans, discuss ethical considerations, and share best practices from educators who have successfully incorporated AI education into their classrooms. You will leave with concrete resources you can implement immediately.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    whatYouWillLearn: [
      'Age-appropriate AI concepts for different grade levels',
      'Ready-to-use lesson plans and classroom activities',
      'How to address student questions about AI ethics',
      'Free tools and resources for teaching AI literacy',
      'Strategies for detecting and discussing AI-generated student work',
    ],
    location: 'Newark Teachers Center, Room 201',
    maxAttendees: 40,
  },
  'ai-town-hall-community': {
    fullDescription: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Join your neighbors for an open forum discussion about how artificial intelligence is impacting our Newark community. This is your chance to share concerns, ask questions, and collaborate on solutions with fellow community members, local leaders, and AI experts.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We will discuss AI in local employment, education, healthcare, and city services. This event is designed to be inclusive and accessible to everyone, regardless of technical background. Your voice matters in shaping how AI affects Newark.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    whatYouWillLearn: [
      'How AI is being used in Newark city services',
      'Impact of AI on local job market and employment',
      'AI applications in Newark schools and healthcare',
      'Your rights and privacy in an AI-driven world',
      'How to get involved in shaping AI policy locally',
    ],
    location: 'Newark City Hall, Council Chambers',
    maxAttendees: 100,
  },
}

async function enrichEvents() {
  try {
    console.log('Fetching all events...')
    const events = await client.fetch(`*[_type == "event"]{ _id, "slug": slug.current, title }`)
    console.log(`Found ${events.length} events`)

    for (const event of events) {
      const details = eventDetails[event.slug]

      if (details) {
        console.log(`Updating event: ${event.title}`)

        await client
          .patch(event._id)
          .set({
            fullDescription: details.fullDescription,
            whatYouWillLearn: details.whatYouWillLearn,
            location: details.location,
            maxAttendees: details.maxAttendees,
            registrationOpen: true,
          })
          .commit()

        console.log(`✓ Updated ${event.title}`)
      } else {
        console.log(`⚠ No details found for: ${event.slug}`)
      }
    }

    console.log('\n✅ All events enriched successfully!')
  } catch (error) {
    console.error('Error enriching events:', error)
    process.exit(1)
  }
}

enrichEvents()
