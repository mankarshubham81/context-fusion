// export interface BlogPost {
//     title: string;
//     slug: string;
//     author: string;
//     excerpt: string;
//     publishedAt: string;
//     mainImage: {
//       asset: {
//         url: string;
//       };
//       alt?: string;
//     };
//     categories: string[];
//     body: Block[];
//   }
  
//   export interface Block {
//     _key: string;
//     _type: string;
//     children?: Child[];
//     markDefs?: any[];
//     style?: string;
//     code?: string;
//     language?: string;
//   }
  
//   export interface Child {
//     _key: string;
//     text: string;
//     marks: string[];
//   }
  

  // types.ts
export interface BlogPost {
    title: string;
    slug: string;
    author: string;
    excerpt: string;
    publishedAt: string;
    mainImage: {
      asset: {
        url: string;
      };
      alt?: string;
    };
    categories: string[];
    body: Block[];
  }
  
  export interface Block {
    _key: string;
    _type: string;
    children?: Child[];
    markDefs?: any[];
    style?: string;
    code?: string;
    language?: string;
    h1: string;
  }

 export interface BlogPostData {
    title: string;
    slug: { current: string };
    authorName: string;
    mainImage: MainImage; // Use the defined MainImage type
    categories: Category[];
    publishedAt: string;
    excerpt: string;
    readingTime: number;
    body?: string;
  }
  
  export interface Child {
    _key: string;
    text: string;
    marks: string[];
  }

  export type MainImage = {
    asset: {
      url: string;
    };
    alt: string;
  };
  
  // Define a type for categories
  export type Category = {
    title: string;
    slug: string;
  };

  import { PortableTextBlock as PTBlock, PortableTextMarkDefinition } from '@portabletext/types';

/**
 * Represents a single block of Portable Text content.
 */
export interface PortableTextBlock extends PTBlock {}

/**
 * Represents the definition of a link mark.
 * Extends PortableTextMarkDefinition to include the 'href' property.
 */
export interface LinkMarkDefinition extends PortableTextMarkDefinition {
  href?: string;
}