"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
// import client from "@/lib/sanity.client"; // Import your Sanity client
import { client as sanityClient } from '../../sanity/lib/client';
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import PortableText from './../../components/PortableText';


interface Author {
  name: string;
  slug: { current: string };
  image: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  bio: any[];
  socialLinks: { platform: string; url: string }[];
}

interface SocialIconProps {
  href: string;
  icon: JSX.Element;
}

const About = () => {
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    // Fetch author data using GROQ query
    const fetchAuthor = async () => {
      // *[_type == "author" && slug.current == "your-slug"]{
      const data = await sanityClient.fetch(`
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
      `);
      setAuthor(data);
      console.log("author 38", data);
    };

    fetchAuthor();
  }, []);

  if (!author) return <p>Loading...</p>;

  return (
    <section className="min-h-screen mt-10 py-16 bg-gray-100 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white mb-8">
          About {author.name}
        </h1>

        {/* About Content Section */}
        <div className="flex flex-col md:flex-row items-center justify-between sm:mx-4">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <Image
                src={author.image.asset.url}
                alt={`Image of ${author.name}`}
                width={500}
                height={500}
                priority
                // fill
                className="object-cover rounded-full mx-auto scale-75 shadow-lg"
              />
            </div>
          </div>


          {/* Text Section */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12">
          {/* <PortableText content={author.bio} /> */}
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Hello, I'm {author.name}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {/* {/* Render Portable Text  */}
              {author.bio.map((block, index) => (
                <p key={index}>{block.children[0].text}</p>
              ))}
            </div>

            <div className="mt-4">
              {/* <h3 className="text-xl font-semibold mb-2">Connect with me:</h3> */}
              {/* <ul>
                {author.socialLinks.map((link, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul> */}
              {/* Section 3: Social Media Icons */}
              <div className="flex flex-col items-center md:items-center">
                <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                <div className="flex space-x-6">
                  <SocialIcon href={`${author.socialLinks[0]}`} icon={<FaGithub size={'25px'} />} />
                  <SocialIcon href={`${author.socialLinks[1]}`} icon={<FaLinkedin size={'25px'} />} />
                  <SocialIcon href={`${author.socialLinks[2]}`} icon={<FaInstagram size={'25px'} />} />
                  <SocialIcon href={`${author.socialLinks[3]}`} icon={<FaTwitter size={'25px'} />} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon }) => (
  <a href={href} className="hover:text-blue-500" target="_blank" rel="noopener noreferrer">
    {icon}
  </a>
);

export default About;
