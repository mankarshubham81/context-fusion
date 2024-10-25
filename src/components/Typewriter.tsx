// Typewriter.tsx
"use client"
import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  words,
  typingSpeed = 200,
  deletingSpeed = 100,
  delayBetweenWords = 1000,
}) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const speed = isDeleting ? deletingSpeed : typingSpeed;

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[loopNum % words.length];
      setText(isDeleting ? currentWord.slice(0, text.length - 1) : currentWord.slice(0, text.length + 1));

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum((prevLoopNum) => prevLoopNum + 1);
      }
    };

    const typingTimeout = setTimeout(handleTyping, speed);
    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, speed, loopNum, words]);

  return (
    <p className="border-b-4 text-customBlue border-purple-700 pb-1 inline-block">
      {text}
      <span className="blinking-cursor text-customBlue font-bold">|</span>
    </p>
  );
};

export default Typewriter;
