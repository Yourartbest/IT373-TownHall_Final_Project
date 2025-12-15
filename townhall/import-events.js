import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'ajcjdayi',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN || 'YOUR_WRITE_TOKEN_HERE',
  apiVersion: '2024-12-10'
})

const events = [
  {
    _type: 'event',
    title: 'AI Basics for Everyone',
    slug: {
      _type: 'slug',
      current: 'ai-basics-for-everyone'
    },
    description: 'Learn what AI really is and how it affects your daily life. No tech experience needed!',
    fullDescription: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Join us for a beginner-friendly introduction to artificial intelligence. This workshop is designed for anyone curious about AI, regardless of their technical background.'
          }
        ],
        markDefs: [],
        style: 'normal'
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We\'ll cover what AI is, how it works, and how it impacts your everyday life—from smartphone assistants to online recommendations. Bring your questions and curiosity!'
          }
        ],
        markDefs: [],
        style: 'normal'
      }
    ],
    date: '2025-12-14T14:00:00.000Z',
    location: 'Newark Public Library',
    difficultyLevel: 'beginner',
    audienceTag: ['parents', 'community-leaders'],
    whatYouWillLearn: [
      'What AI is and how it works in simple terms',
      'Real-world examples of AI in daily life',
      'How to spot AI tools and services',
      'Basic AI safety and privacy tips'
    ],
    registrationOpen: true,
    maxAttendees: 30
  },
  {
    _type: 'event',
    title: 'AI for Small Business Owners',
    slug: {
      _type: 'slug',
      current: 'ai-for-small-business-owners'
    },
    description: 'Discover simple AI tools that can help your local business grow and save time.',
    fullDescription: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Small business owners: learn how AI can help you work smarter, not harder. This practical workshop covers affordable AI tools that can improve customer service, marketing, and daily operations.'
          }
        ],
        markDefs: [],
        style: 'normal'
      }
    ],
    date: '2025-12-17T18:30:00.000Z',
    location: 'Newark Community Center',
    difficultyLevel: 'beginner',
    audienceTag: ['community-leaders'],
    whatYouWillLearn: [
      'AI tools for customer service and scheduling',
      'Simple marketing automation with AI',
      'How AI can help with bookkeeping and admin',
      'Affordable AI solutions for small budgets'
    ],
    registrationOpen: true,
    maxAttendees: 25
  },
  {
    _type: 'event',
    title: 'Youth AI Workshop: Creative Coding',
    slug: {
      _type: 'slug',
      current: 'youth-ai-workshop-creative-coding'
    },
    description: 'Teens learn to create art and music using AI tools. Fun, hands-on, and beginner-friendly!',
    fullDescription: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Calling all teens! Explore the creative side of AI by making digital art, music, and animations using beginner-friendly AI tools. No coding experience required—just bring your imagination!'
          }
        ],
        markDefs: [],
        style: 'normal'
      }
    ],
    date: '2025-12-21T10:00:00.000Z',
    location: 'Newark Tech Hub',
    difficultyLevel: 'beginner',
    audienceTag: ['students'],
    whatYouWillLearn: [
      'Create digital art with AI image generators',
      'Make music and sounds using AI tools',
      'Design animations and visual effects',
      'Share your creations with the group'
    ],
    registrationOpen: true,
    maxAttendees: 20
  },
  {
    _type: 'event',
    title: 'AI in Education: Teacher Workshop',
    slug: {
      _type: 'slug',
      current: 'ai-in-education-teacher-workshop'
    },
    description: 'For teachers and educators: explore how AI can enhance your classroom while addressing ethical concerns and student safety.',
    fullDescription: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This workshop is designed specifically for K-12 teachers and educators. Learn how to integrate AI tools into your curriculum responsibly while teaching students about AI literacy, ethics, and safety.'
          }
        ],
        markDefs: [],
        style: 'normal'
      }
    ],
    date: '2026-01-08T16:00:00.000Z',
    location: 'Newark Board of Education',
    difficultyLevel: 'intermediate',
    audienceTag: ['educators'],
    whatYouWillLearn: [
      'AI tools for lesson planning and grading',
      'Teaching AI literacy to students',
      'Addressing ethical concerns and bias',
      'Student data privacy and safety',
      'Age-appropriate AI activities'
    ],
    registrationOpen: true,
    maxAttendees: 35
  },
  {
    _type: 'event',
    title: 'Family AI Safety & Privacy',
    slug: {
      _type: 'slug',
      current: 'family-ai-safety-privacy'
    },
    description: 'Parents and guardians: learn how to keep your family safe online and understand AI tools your kids might use.',
    fullDescription: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A workshop for parents and guardians focused on understanding AI tools your children encounter, from chatbots to social media algorithms. Learn how to have conversations about AI safety and set healthy boundaries.'
          }
        ],
        markDefs: [],
        style: 'normal'
      }
    ],
    date: '2026-01-11T11:00:00.000Z',
    location: 'Newark Public Library',
    difficultyLevel: 'beginner',
    audienceTag: ['parents'],
    whatYouWillLearn: [
      'AI tools your kids are likely using',
      'How to talk to children about AI safety',
      'Privacy settings and parental controls',
      'Recognizing AI-generated content',
      'When AI use is helpful vs. harmful'
    ],
    registrationOpen: true,
    maxAttendees: 30
  },
  {
    _type: 'event',
    title: 'Volunteer Training: Event Helper',
    slug: {
      _type: 'slug',
      current: 'volunteer-training-event-helper'
    },
    description: 'Want to help at our events? Join this quick training to learn how you can support our community learning sessions.',
    fullDescription: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Interested in volunteering with Newark AI Town Hall? This training session will show you how you can help at our events—from setup and registration to supporting participants during workshops. No AI expertise required!'
          }
        ],
        markDefs: [],
        style: 'normal'
      }
    ],
    date: '2026-01-16T18:00:00.000Z',
    location: 'Virtual (Zoom)',
    difficultyLevel: 'beginner',
    audienceTag: ['community-leaders'],
    whatYouWillLearn: [
      'Overview of our mission and events',
      'Volunteer roles and responsibilities',
      'How to support workshop participants',
      'Event setup and logistics',
      'Communication and community guidelines'
    ],
    registrationOpen: true,
    maxAttendees: 50
  }
]

async function importEvents() {
  console.log('Starting event import...\n')
  
  for (const event of events) {
    try {
      const result = await client.create(event)
      console.log(`✅ Created: ${event.title}`)
      console.log(`   ID: ${result._id}`)
      console.log(`   URL: /events/${event.slug.current}/\n`)
    } catch (error) {
      console.error(`❌ Failed to create: ${event.title}`)
      console.error(`   Error: ${error.message}\n`)
    }
  }
  
  console.log('Import complete!')
}

importEvents()
