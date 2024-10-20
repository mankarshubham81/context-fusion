import { AreaChart } from 'lucide-react';

// import siteMetadata from '@/data/siteMetadata';

// @ts-check
// /** @type {import("pliny/config").PlinyConfig } */ 88888 

const siteMetadata = {
    title: "Context Fusion",
    author: 'Shubham Mankar',
    fullName: 'Shubham Damodhar Mankar',
    headerTitle: "mankarshubham81's Blog",
    description: 'My desire to practice my skills and share my acquired knowledge fuels my endeavors.',
    language: 'en-us',
    theme: 'system',
    siteUrl: 'https://context-fusion.vercel.app',
    analyticsURL:
      "https://cloud.umami.is/share/DbqV99rrz5x18rs5/context-fusion.vercel.app",
    siteRepo: 'https://github.com/mankarshubham81/context-fusion',
    siteLogo: '/static/images/context_fusion.png',
    image: '/static/images/context_fusion.png',
    socialBanner: '/static/images/projects/karhdo-blog.png',
    email: 'mankarshubham81@gmail.com',
    github: 'https://github.com/mankarshubham81',
    // facebook: 'https://www.facebook.com/mankarshubham81',
    linkedin: 'https://www.linkedin.com/in/mankarshubham815',
    twitter: 'https://twitter.com/mankarshubham81',
    youtube: 'https://youtube.com',
    locale: 'en-US',
    socialAccounts: {
      github: 'mankarshubham81',
      linkedin: 'mankarshubham81',
      // facebook: 'karhdo.dev',
    },
    analytics: {
      umamiWebsiteId: '5aaf48b2-433e-4c94-8711-d3c4a96dd240',
    },
    newsletter: {
      provider: 'buttondown',
    },
    comments: {
      provider: 'giscus',
      giscusConfig: {
        repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
        repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
        category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
        categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
        mapping: 'title',
        reactions: '1',
        metadata: '0',
        theme: 'light',
        darkTheme: 'transparent_dark',
        themeURL: '',
        lang: 'en',
        inputPosition: 'top',
      },
    },
  };
  
//   module.exports = siteMetadata;

const AnalyticsLink = () => {
  return (
    <button
      aria-label="Open analytics"
      type="button"
      className="ml-1 mr-1 h-8 w-8 rounded p-1 hover:bg-gray-200 dark:hover:bg-primary sm:ml-4"
      data-umami-event="nav-analytics"
      onClick={() => window.open(siteMetadata.analyticsURL, '_blank')}
    >
      <AreaChart strokeWidth={1.5} size={20} />
    </button>
  );
};

export default AnalyticsLink;