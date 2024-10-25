// About.tsx
import Image from "next/image";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { client as sanityClient } from "../sanity/lib/client";
import logoSrc from "../../static/images/context_fusion.png";
import imageSrc from "../../static/images/si1.jpg";
import PortableText from "./PortableText";
import Typewriter from "../components/Typewriter";
import { authorQuery } from "@/sanity/lib/queries";
import { Author } from "@/app/types";

export const dynamic = "force-static"; // Optimize for static rendering

const About = async () => {
  // Fetching author data directly in the server component
  const author: Author = await sanityClient.fetch(authorQuery);

  const images = [imageSrc, logoSrc];
  const typewriterWords = [
    "Software Engineer",
    "Full Stack Developer",
    "Footballer",
    "Karateka",
    "Web Developer",
    "Photographer",
    "Skater",
    "Shuttler",
    "Blogger",
    "Writer",
    "Vadak",
  ];

  return (
    <section className="min-h-80 mt-12 mx-3 sm:mx-4 py-9 bg-gray-100 dark:bg-slate-900 [filter:drop-shadow(0_0_1em_#7C3AED)]">
      <div className="max-w-screen-2xl mx-auto w-full px-3">
        <h1 className="text-center text-3xl font-semibold">
          {`My Name Is ${author.name}`}
        </h1>
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-4">
          <Typewriter words={typewriterWords} />
        </h2>

        <div className="flex w-full flex-col lg:flex-row items-center justify-between sm:mx-4">
          <div className="relative w-80 h-80 mx-1">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Image of ${author.name}`}
                width={400}
                priority
                height={400}
                className={`absolute top-0 left-0 object-cover rounded-full shadow-lg transition-opacity duration-900 [filter:drop-shadow(0_0_2em_#7C3AED)] ${
                  index === 0 ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 w-full sm:px-8 md:mt-0 md:pl-12">
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              <PortableText content={author.bio} />
            </div>

            <div className="mt-4">
              <div className="flex flex-col items-center md:items-center">
                <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                <div className="flex space-x-6">
                  {author.socialLinks.map((link, index) => (
                    <SocialIcon
                      key={index}
                      href={link.url}
                      icon={
                        index === 0 ? (
                          <FaGithub size="25px" />
                        ) : index === 1 ? (
                          <FaLinkedin size="25px" />
                        ) : index === 2 ? (
                          <FaInstagram size="25px" />
                        ) : (
                          <FaTwitter size="25px" />
                        )
                      }
                      platform={link.platform}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialIcon = ({
  href,
  icon,
  platform,
}: {
  href: string;
  icon: JSX.Element;
  platform: string;
}) => (
  <a
    href={href}
    aria-label={`Link to ${platform}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-500"
  >
    {icon}
  </a>
);

export default About;
