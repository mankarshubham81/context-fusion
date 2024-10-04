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

