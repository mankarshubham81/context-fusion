// import { PortableTextBlock as PTBlock, PortableTextMarkDefinition, PortableTextSpan, ArbitraryTypedObject } from '@portabletext/types';
import { PortableTextBlock as PTBlock, PortableTextSpan, ArbitraryTypedObject, PortableTextMarkDefinition } from '@portabletext/types';

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
    body: PortableTextBlock[];
  }
  
  // export interface Block {
  //   _key: string;
  //   _type: string;
  //   children?: Child[];
  //   markDefs?: any[];
  //   style?: string;
  //   code?: string;
  //   language?: string;
  //   h1: string;
  // }

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

  // import { PortableTextBlock as PTBlock, PortableTextMarkDefinition } from '@portabletext/types';

/**
 * Represents a single block of Portable Text content.
 */
// export interface PortableTextBlock extends PTBlock {}

/**
 * Represents the definition of a link mark.
 * Extends PortableTextMarkDefinition to include the 'href' property.
 */
// export interface LinkMarkDefinition extends PortableTextMarkDefinition {
//   href?: string;
// }

export interface PortableTextBlock extends PTBlock {
  children: (ArbitraryTypedObject | PortableTextSpan)[];
}

/**
 * Represents the definition of a link mark.
 */
export interface LinkMarkDefinition extends PortableTextMarkDefinition {
  _type: 'link';
  href?: string;
}

/**
 * Represents the definition of a video block.
 */
export interface VideoBlock extends PTBlock {
  _type: 'video';
  url: string; // URL of the video (e.g., YouTube, Vimeo, or direct video file)
  title?: string; // Optional title for the video
}

export interface Author {
  name: string;
  slug: { current: string };
  image: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  // bio: { children: { text: string }[] }[];
  bio: PortableTextBlock[];
  socialLinks: { platform: string; url: string }[];
}

export interface PortableTextBlock extends PTBlock {
  children: (ArbitraryTypedObject | PortableTextSpan)[];
}

export interface CategoryListProps {
  categories: Category[]; // Array of Category objects
  onCategoryClick: (category: string) => void;
  selectedCategory: string; // Add the selected category as a prop
}