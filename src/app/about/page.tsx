"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { client as sanityClient } from "../../sanity/lib/client";
import logoSrc from "../../../static/images/context_fusion.png";
import { PortableTextBlock as PTBlock, PortableTextSpan, ArbitraryTypedObject } from '@portabletext/types';
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
  // bio: { children: { text: string }[] }[];
  bio: PortableTextBlock[];
  socialLinks: { platform: string; url: string }[];
}

export interface PortableTextBlock extends PTBlock {
  children: (ArbitraryTypedObject | PortableTextSpan)[];
}

// interface SocialIconProps {
//   href: string;
//   icon: JSX.Element;
// }

const About = () => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  // Typewriter state
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(200);
  const typewriterWords = ["Software Engineer", "Full Stack Developer", "Footballer", "karateka","Web Developer", "Photographer", "skater", "shuttler", "Blogger", "Writer", "Vadak"];

  useEffect(() => {
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
    };

    fetchAuthor();

    const imageTransitionInterval = setInterval(() => {
      setActiveImage((prevImage) => (prevImage === 0 ? 1 : 0));
    }, 3800);

    return () => clearInterval(imageTransitionInterval);
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = typewriterWords[loopNum % typewriterWords.length];
      setText(
        isDeleting
          ? currentWord.substring(0, text.length - 1)
          : currentWord.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 200);

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000); // Delay before deleting
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, typingSpeed]);

  if (!author) return <p>Loading...</p>;

  const images = [author.image.asset.url, logoSrc];

  return (
    <section className="min-h-screen mt-12 sm:mx-4 py-9 bg-gray-100 dark:bg-slate-900 [filter:drop-shadow(0_0_1em_#7C3AED)]">
      <div className="w-full px-4">
        {/* <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Context Fusion
        </h1> */}
        <h2 className="text-center text-3xl font-semibold" >
          {`My Name Is ${author.name}`}{" "}
        </h2>
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-4">
          <p
            className="border-b-4 text-customBlue border-purple-700 pb-1 inline-block"
          >
            {`I'm ${text}`}
          </p>
          <span className="blinking-cursor text-customBlue font-bold">|</span>
        </h2>


        <div className="flex w-full flex-col md:flex-row items-center justify-between sm:mx-4">
          {/* Image Section */}
          <div className=" gap-1 shrink-0 ">
            <div className=" relative w-80 h-80 mx-1 ">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Image of ${author.name}`}
                  width={400}
                  height={400}
                  className={`absolute top-0 left-0 object-cover rounded-full shadow-lg ease-in-out transition-opacity duration-1000 [filter:drop-shadow(0_0_2em_#7C3AED)] ${
                    activeImage === index ? "opacity-100" : "opacity-5"
                  }`}
                  priority
                />
              ))}
            </div>
          </div>

          {/* Text Section */}
          <div className="mt-8 w-full sm:px-8 md:mt-0 md:pl-12">
            {/* <h2 className="text-2xl font-semibold" >
              {`My Name Is ${author.name}`}{" "}
            </h2> */}
            {/* <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              <p
                className="border-b-4 text-customBlue border-purple-700 pb-1 inline-block"
              >
                {`I'm ${text}`}
              </p>
              <span className="blinking-cursor text-customBlue font-bold">|</span>
            </h2> */}
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
            <PortableText content={author.bio} />
              {/* {author.bio.map((block, index) => (
                <p key={index}>{block.children[0].text}</p>
              ))} */}
            </div>

            {/* Social Media Icons */}
            <div className="mt-4">
              <div className="flex flex-col items-center md:items-center">
                <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                <div className="flex space-x-6">
                  <SocialIcon
                    href={`${author.socialLinks[0].url}`}
                    icon={<FaGithub size={"25px"} />}
                  />
                  <SocialIcon
                    href={`${author.socialLinks[1].url}`}
                    icon={<FaLinkedin size={"25px"} />}
                  />
                  <SocialIcon
                    href={`${author.socialLinks[2].url}`}
                    icon={<FaInstagram size={"25px"} />}
                  />
                  <SocialIcon
                    href={`${author.socialLinks[3].url}`}
                    icon={<FaTwitter size={"25px"} />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialIcon = ({ href, icon }: { href: string; icon: JSX.Element }) => (
  <a href={href} className="hover:text-blue-500" target="_blank" rel="noopener noreferrer">
    {icon}
  </a>
);

export default About;
