"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 5.0,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    const animateText = async () => {
      while (true) {
        await animate(
          "span",
          {
            opacity: 1,
            filter: filter ? "blur(0px)" : "none",
          },
          {
            duration: 2.0,
            delay: stagger(0.5),
          }
        );

        await new Promise((resolve) => setTimeout(resolve, 3000)); 

        await animate(
          "span",
          {
            opacity: 0,
            filter: filter ? "blur(10px)" : "none",
          },
          {
            duration: 1.5,
            delay: stagger(0.3),
          }
        );
      }
    };

    animateText();
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-red-500 text-red-600 opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
              >
              {word}{" "}
            </motion.span>

          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold flex justify-center items-center", className)}>
      <div className="mt-5 mb-5">
        <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
  
};
