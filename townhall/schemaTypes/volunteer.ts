import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'volunteer',
  title: 'Volunteer Opportunity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Opportunity Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'skillsNeeded',
      title: 'Skills Needed',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Event Planning', value: 'event-planning' },
          { title: 'Social Media', value: 'social-media' },
          { title: 'Graphic Design', value: 'graphic-design' },
          { title: 'Writing/Editing', value: 'writing' },
          { title: 'Teaching/Presenting', value: 'teaching' },
          { title: 'Technical/Coding', value: 'technical' },
          { title: 'Community Outreach', value: 'outreach' }
        ]
      }
    }),
    defineField({
      name: 'timeCommitment',
      title: 'Time Commitment',
      type: 'string',
      description: 'e.g., "2-4 hours per week", "One-time event"'
    }),
    defineField({
      name: 'remote',
      title: 'Remote Opportunity',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'isActive',
      title: 'Currently Accepting Applications',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'applicationUrl',
      title: 'Application URL',
      type: 'url',
      description: 'Link to application form or email'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      active: 'isActive',
      media: 'image'
    },
    prepare({ title, active, media }) {
      return {
        title,
        subtitle: active ? 'Active' : 'Inactive',
        media
      }
    }
  }
})
