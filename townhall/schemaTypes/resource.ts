import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Educator Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
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
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Lesson Plan', value: 'lesson-plan' },
          { title: 'Activity', value: 'activity' },
          { title: 'Video', value: 'video' },
          { title: 'Reading Material', value: 'reading' },
          { title: 'Tool/Software', value: 'tool' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'gradeLevel',
      title: 'Grade Level',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Elementary (K-5)', value: 'elementary' },
          { title: 'Middle School (6-8)', value: 'middle-school' },
          { title: 'High School (9-12)', value: 'high-school' },
          { title: 'Adult Education', value: 'adult' }
        ]
      }
    }),
    defineField({
      name: 'subject',
      title: 'Subject Area',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Computer Science', value: 'computer-science' },
          { title: 'Math', value: 'math' },
          { title: 'Science', value: 'science' },
          { title: 'Social Studies', value: 'social-studies' },
          { title: 'Language Arts', value: 'language-arts' }
        ]
      }
    }),
    defineField({
      name: 'duration',
      title: 'Estimated Duration',
      type: 'string',
      description: 'e.g., "45 minutes", "1 hour", "2 class periods"'
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string'
            }
          ]
        },
        {
          type: 'file',
          fields: [
            {
              name: 'description',
              title: 'File Description',
              type: 'string'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
      description: 'External link to downloadable resource'
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
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
      type: 'resourceType',
      media: 'thumbnail'
    },
    prepare({ title, type, media }) {
      return {
        title,
        subtitle: type ? type.replace('-', ' ') : 'Resource',
        media
      }
    }
  }
})
