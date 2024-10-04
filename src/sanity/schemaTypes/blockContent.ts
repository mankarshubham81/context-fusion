import { defineType, defineArrayMember } from 'sanity';

// Schema for block content
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    // Block content for text (headings, lists, etc.)
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },  // Add code decorator for inline code
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // Image field with alt text
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    // Code block field for code snippets
   defineArrayMember({
    title: 'Code Block',
    type: 'code',
    options: {
      language: 'javascript', // Default language, you can also allow users to choose
      languageAlternatives: [
        { title: 'JavaScript', value: 'javascript' },
        { title: 'TypeScript', value: 'typescript' },
        { title: 'HTML', value: 'html' },
        { title: 'CSS', value: 'css' },
        { title: 'Python', value: 'python' },
        { title: 'Ruby', value: 'ruby' },
        { title: 'Java', value: 'java' },
        { title: 'C', value: 'c' },
        { title: 'C++', value: 'cpp' },
        { title: 'C#', value: 'csharp' },
        { title: 'PHP', value: 'php' },
        { title: 'Go', value: 'go' },
        { title: 'Swift', value: 'swift' },
        { title: 'Kotlin', value: 'kotlin' },
        { title: 'Rust', value: 'rust' },
        { title: 'Shell', value: 'bash' },
        { title: 'R', value: 'r' },
        { title: 'Perl', value: 'perl' },
        { title: 'SQL', value: 'sql' },
        { title: 'Markdown', value: 'markdown' },
        { title: 'YAML', value: 'yaml' },
        { title: 'JSON', value: 'json' },
        { title: 'GraphQL', value: 'graphql' },
        { title: 'Dockerfile', value: 'dockerfile' },
        { title: 'PowerShell', value: 'powershell' },
        { title: 'Lua', value: 'lua' },
        { title: 'Scala', value: 'scala' },
        { title: 'Elixir', value: 'elixir' },
        { title: 'Haskell', value: 'haskell' },
        { title: 'Objective-C', value: 'objectivec' },
        { title: 'MATLAB', value: 'matlab' },
      ],
    },
  }),
    // Video embedding field
    defineArrayMember({
      type: 'object',
      name: 'video',
      title: 'Video',
      fields: [
        {
          title: 'URL',
          name: 'url',
          type: 'url',
        },
      ],
    }),
  ],
});

// Schema for authors
export const authorSchema = defineType({
  title: 'Author',
  name: 'author',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Bio',
      name: 'bio',
      type: 'blockContent',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
  ],
});

// Schema for categories
export const categorySchema = defineType({
  title: 'Category',
  name: 'category',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
  ],
});

// Schema for blog post
export const blogPostSchema = defineType({
  title: 'Blog Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      title: 'Published Date',
      name: 'publishedAt',
      type: 'datetime',
    },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'text',
    },
    {
      title: 'Body',
      name: 'body',
      type: 'blockContent',
    },
    {
      title: 'Categories',
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      title: 'Main Image',
      name: 'mainImage',
      type: 'image',
      options: { hotspot: true },
    },
    {
      title: 'SEO Title',
      name: 'seoTitle',
      type: 'string',
    },
    {
      title: 'SEO Description',
      name: 'seoDescription',
      type: 'text',
    },
  ],
});
