import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'ajcjdayi',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN || '',
  apiVersion: '2024-12-10'
})

async function createContent() {
  console.log('🚀 Creating sample content...\n')

  // Create Authors
  console.log('📝 Creating authors...')
  
  const author1 = await client.create({
    _type: 'author',
    name: 'Maria Santos',
    slug: { _type: 'slug', current: 'maria-santos' },
    bio: 'Community organizer and AI educator passionate about making technology accessible to everyone in Newark.',
    role: 'Community Organizer'
  })
  console.log('✅ Created author: Maria Santos')

  const author2 = await client.create({
    _type: 'author',
    name: 'Dr. James Chen',
    slug: { _type: 'slug', current: 'dr-james-chen' },
    bio: 'Computer science professor at NJIT specializing in AI ethics and education.',
    role: 'AI Educator'
  })
  console.log('✅ Created author: Dr. James Chen\n')

  // Create Events
  console.log('🎉 Creating events...')
  
  const event1 = await client.create({
    _type: 'event',
    title: 'AI Basics for Parents: What You Need to Know',
    slug: { _type: 'slug', current: 'ai-basics-for-parents' },
    description: 'Learn how AI affects your children\'s education and daily life. No tech experience needed - just bring your questions!',
    date: new Date('2024-12-20T18:00:00').toISOString(),
    location: 'Newark Public Library, Main Branch',
    difficultyLevel: 'beginner',
    audienceTag: ['parents'],
    whatYouWillLearn: [
      'What AI is and how it works in simple terms',
      'How AI is used in schools and education',
      'How to talk to your kids about AI safely'
    ],
    registrationOpen: true
  })
  console.log('✅ Created event: AI Basics for Parents')

  const event2 = await client.create({
    _type: 'event',
    title: 'Teaching AI Literacy in the Classroom',
    slug: { _type: 'slug', current: 'teaching-ai-literacy' },
    description: 'Practical strategies and ready-to-use lesson plans for introducing AI concepts to middle and high school students.',
    date: new Date('2024-12-21T15:00:00').toISOString(),
    location: 'NJIT Campus, Room 202',
    difficultyLevel: 'intermediate',
    audienceTag: ['educators'],
    whatYouWillLearn: [
      'Age-appropriate AI curriculum frameworks',
      'Free tools and resources for teaching AI',
      'How to address student concerns about AI'
    ],
    registrationOpen: true
  })
  console.log('✅ Created event: Teaching AI Literacy')

  const event3 = await client.create({
    _type: 'event',
    title: 'AI Town Hall: Community Discussion',
    slug: { _type: 'slug', current: 'ai-town-hall-community' },
    description: 'Open forum to discuss how AI is changing our community. Share your questions, concerns, and ideas about AI in Newark.',
    date: new Date('2024-12-22T13:00:00').toISOString(),
    location: 'Newark Community Center, Main Hall',
    difficultyLevel: 'beginner',
    audienceTag: ['parents', 'educators', 'community-leaders'],
    whatYouWillLearn: [
      'How AI affects jobs in Newark',
      'AI-powered community services and resources',
      'How to stay informed about AI developments'
    ],
    registrationOpen: true
  })
  console.log('✅ Created event: AI Town Hall\n')

  // Create Blog Posts
  console.log('📰 Creating blog posts...')
  
  const post1 = await client.create({
    _type: 'post',
    title: 'What is AI? A Simple Explanation for Everyone',
    slug: { _type: 'slug', current: 'what-is-ai-simple-explanation' },
    author: { _type: 'reference', _ref: author1._id },
    publishedAt: new Date().toISOString(),
    excerpt: 'Artificial Intelligence (AI) sounds complicated, but it\'s easier to understand than you think. Here\'s everything you need to know in plain language.',
    body: [
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Artificial Intelligence (AI) is when computers learn to do tasks that usually need human thinking.'}],
        markDefs: [],
        style: 'normal'
      },
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Think of it like this: When you teach a child to recognize a cat, you show them many pictures. AI works the same way - we show computers thousands of examples until they learn.'}],
        markDefs: [],
        style: 'normal'
      },
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Common AI examples you use every day:'}],
        markDefs: [],
        style: 'h3'
      },
      {
        _type: 'block',
        children: [{_type: 'span', text: '- Netflix recommending shows you might like\n- Your phone\'s autocorrect\n- Voice assistants like Siri or Alexa\n- Face recognition in photos'}],
        markDefs: [],
        style: 'normal'
      }
    ],
    categories: ['ai-basics'],
    plainLanguage: 'middle-school'
  })
  console.log('✅ Created blog post: What is AI?')

  const post2 = await client.create({
    _type: 'post',
    title: 'How AI is Changing Education in Newark',
    slug: { _type: 'slug', current: 'ai-changing-education-newark' },
    author: { _type: 'reference', _ref: author2._id },
    publishedAt: new Date().toISOString(),
    excerpt: 'From personalized tutoring to automatic grading, AI is transforming how students learn. Here\'s what Newark families and educators need to know.',
    body: [
      {
        _type: 'block',
        children: [{_type: 'span', text: 'AI is already helping students in Newark schools. Here\'s how:'}],
        markDefs: [],
        style: 'normal'
      },
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Personalized Learning'}],
        markDefs: [],
        style: 'h3'
      },
      {
        _type: 'block',
        children: [{_type: 'span', text: 'AI tutoring programs adapt to each student\'s pace. If a student struggles with fractions, the AI gives extra practice. If they master it quickly, it moves them ahead.'}],
        markDefs: [],
        style: 'normal'
      },
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Language Support'}],
        markDefs: [],
        style: 'h3'
      },
      {
        _type: 'block',
        children: [{_type: 'span', text: 'AI translation tools help students who speak Spanish, Portuguese, or other languages at home. They can read assignments in their native language while learning English.'}],
        markDefs: [],
        style: 'normal'
      }
    ],
    categories: ['for-parents', 'for-educators'],
    plainLanguage: 'adult'
  })
  console.log('✅ Created blog post: AI in Education\n')

  console.log('🎉 All content created successfully!')
  console.log('\n📊 Summary:')
  console.log('  - 2 Authors')
  console.log('  - 3 Events')
  console.log('  - 2 Blog Posts')
  console.log('\n✅ Your content is now live in Sanity!')
}

createContent().catch(console.error)
