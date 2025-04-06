"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useRef } from "react";

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isLooping = useRef(false);

  useEffect(() => {
    const animateTyping = async () => {
      while (true) {
        const spans = scope.current.querySelectorAll("span");

        await animate(
          spans,
          { opacity: 1 },
          {
            duration: 0.05,
            delay: staggerDelayBetweenWords(spans),
            ease: "easeInOut",
          }
        );

        await new Promise((res) => setTimeout(res, 3000));

        await animate(
          Array.from(spans).reverse(),
          { opacity: 0 },
          {
            duration: 0.05,
            delay: staggerDelayBetweenWords(spans, true),
            ease: "easeInOut",
          }
        );
      }
    };

    animateTyping();
  }, [animate, scope]);

  const staggerDelayBetweenWords = (spans: NodeListOf<Element>, reverse = false) => {
    const total = spans.length;
    return (i: number) =>
      reverse
        ? (total - i) * 0.03 + Math.floor((total - i) / 6) * 0.3
        : i * 0.05 + Math.floor(i / 6) * 0.3;
  };

  const renderWords = () => (
    <motion.div ref={scope} className="inline">
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <motion.span
              initial={{ opacity: 0 }}
              key={`char-${index}`}
              className={cn("dark:text-white text-black opacity-0", word.className)}
            >
              {char}
            </motion.span>
          ))}
          &nbsp;
        </div>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("text-xl sm:text-3xl lg:text-5xl font-bold text-center", className)}>
      {renderWords()}
      <motion.span
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
        className={cn(
          "inline-block ml-1 rounded-sm w-[4px] h-6 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
