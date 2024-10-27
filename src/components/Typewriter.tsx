// Typewriter.tsx
"use client";
import { useEffect, useState, useMemo } from "react";

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
  const [isTyping, setIsTyping] = useState(true);
  const [loopNum, setLoopNum] = useState(0);

  const currentWord = useMemo(() => words[loopNum % words.length], [loopNum, words]);
  const speed = isTyping ? typingSpeed : deletingSpeed;

  useEffect(() => {
    const handleTyping = () => {
      setText((prev) => (isTyping ? currentWord.slice(0, prev.length + 1) : currentWord.slice(0, prev.length - 1)));

      if (isTyping && text === currentWord) {
        setTimeout(() => setIsTyping(false), delayBetweenWords);
      } else if (!isTyping && text === "") {
        setIsTyping(true);
        setLoopNum((prev) => prev + 1);
      }
    };

    const typingTimeout = setTimeout(handleTyping, speed);

    return () => clearTimeout(typingTimeout);
  }, [text, isTyping, speed, currentWord, delayBetweenWords]);

  return (
    <p className="border-b-4 text-customBlue border-purple-700 pb-1 inline-block">
      I&apos;m {text}
      <span className="blinking-cursor text-customBlue font-bold">|</span>
    </p>
  );
};

export default Typewriter;
