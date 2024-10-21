// queries.ts
export const blogPostsQuery = `
  *[_type == "post"]{
    _id,
    title,
    "author": author->name,
    "category": categories[]->title,
    slug,
    mainImage{
      asset->{
        url
      }
    },
    publishedAt,
    excerpt
  } | order(publishedAt desc)
`;


export const postsQuery = `*[_type == "post"]{
  title,
  slug,
  "authorName": author->name,
  mainImage{
    asset->{url},
    alt
  },
  categories[]->{
    title,
    slug
  },
  publishedAt,
  excerpt,
  readingTime
}`;

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  title,
  slug
}`;

export const blogQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  "author": author->name,
  mainImage{
    asset->{url},
    alt
  },
  categories[]->{
    title
  },
  publishedAt,
  body,  
  excerpt
}`;

// *[_type == "author" && slug.current == "your-slug"]{
export const authorQuery = `
*[_type == "author"]{
  name,
  slug,
  image{
    asset->{
      _id,
      url
    }
  },
  bio,
  socialLinks
}[0]
`;
