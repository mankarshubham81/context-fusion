"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { client as sanityClient } from "../sanity/lib/client";
import logoSrc from "../../static/images/context_fusion.png"
import imageSrc from "../../static/images/si1.jpg"
import PortableText from "./PortableText";
import { authorQuery } from "@/sanity/lib/queries";
import { Author } from "@/app/types";

const About = () => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  // Typewriter state
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(200);

  // Memoized typewriter words array
  const typewriterWords = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    const fetchAuthor = async () => {
      const data = await sanityClient.fetch(authorQuery);
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
        setLoopNum((prevLoopNum) => prevLoopNum + 1); // Functional update
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, typingSpeed, loopNum, typewriterWords]);

  if (!author) return <p>Loading...</p>;

  const images = [imageSrc, logoSrc];

  return (
    <section className="min-h-80 mt-12 mx-3 sm:mx-4 py-9 bg-gray-100 dark:bg-slate-900 [filter:drop-shadow(0_0_1em_#7C3AED)]">
      <div className="w-full px-3">
        <h1 className="text-center text-3xl font-semibold">
          {`My Name Is ${author.name}`}{" "}
        </h1>
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-4">
          <p className="border-b-4 text-customBlue border-purple-700 pb-1 inline-block">
            {`I'm ${text}`}
          </p>
          <span className="blinking-cursor text-customBlue font-bold">|</span>
        </h2>

        <div className="flex w-full flex-col md:flex-row items-center justify-between sm:mx-4">
          {/* Image Section */}
          <div className="gap-1 shrink-0">
            <div className="relative w-80 h-80 mx-1">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Image of ${author.name}`}
                  width={400}
                  height={400}
                  className={`absolute top-0 left-0 object-cover rounded-full shadow-lg ease-in-out transition-opacity duration-900 [filter:drop-shadow(0_0_2em_#7C3AED)] ${
                    activeImage === index ? "opacity-100" : "opacity-5"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 w-full sm:px-8 md:mt-0 md:pl-12">
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              <PortableText content={author.bio} />
            </div>

            <div className="mt-4">
              <div className="flex flex-col items-center md:items-center">
                <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                <div className="flex space-x-6">
                  <SocialIcon
                    href={`${author.socialLinks[0].url}`}
                    icon={<FaGithub size={"25px"} />}
                    platform={author.socialLinks[0].platform}
                    />
                  <SocialIcon
                    href={`${author.socialLinks[1].url}`}
                    icon={<FaLinkedin size={"25px"} />}
                    platform={author.socialLinks[1].platform}
                    />
                  <SocialIcon
                    href={`${author.socialLinks[2].url}`}
                    icon={<FaInstagram size={"25px"} />}
                    platform={author.socialLinks[2].platform}
                    />
                  <SocialIcon
                    href={`${author.socialLinks[3].url}`}
                    icon={<FaTwitter size={"25px"} />}
                    platform={author.socialLinks[3].platform}
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

const SocialIcon = ({ href, icon, platform }: { href: string; icon: JSX.Element; platform: string }) => (
  <a
    href={href}
    className="hover:text-blue-500"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={platform}
  >
    {icon}
  </a>
);

export default About;
