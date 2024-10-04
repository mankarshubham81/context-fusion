import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    // Title of the post
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // Slug for SEO-friendly URLs
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    // Reference to the author of the post
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    // Main image for the post with alt text for accessibility
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    // Categories for the post
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    // Date when the post is published
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    // Excerpt for post previews
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary of the post for previews or SEO.',
      validation: (Rule) => Rule.max(200),
    }),
    // Estimated reading time for the post
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'number',
      description: 'Estimated reading time in minutes.',
      validation: (Rule) => Rule.min(1),
    }),
    // SEO Title for better search optimization
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    // SEO Description for search optimization
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    }),
    // Body content of the post
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    // Related posts section for cross-linking
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'post' } }],
      description: 'Links to other posts that may interest the reader.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
