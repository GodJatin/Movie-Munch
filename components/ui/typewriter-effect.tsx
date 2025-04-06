// "use client";

// import { cn } from "@/lib/utils";
// import { motion, stagger, useAnimate, useInView } from "framer-motion";
// import { useEffect } from "react";

// export const TypewriterEffect = ({
//   words,
//   className,
//   cursorClassName,
// }: {
//   words: {
//     text: string;
//     className?: string;
//   }[];
//   className?: string;
//   cursorClassName?: string;
// }) => {
//   // split text inside of words into array of characters
//   const wordsArray = words.map((word) => {
//     return {
//       ...word,
//       text: word.text.split(""),
//     };
//   });

//   const [scope, animate] = useAnimate();
//   const isInView = useInView(scope);
//   useEffect(() => {
//     if (isInView) {
//       const loopAnimation = async () => {
//         while (true) {
//           // Forward typing animation
//           await animate(
//             scope.current.querySelectorAll("span"),
//             {
//               opacity: 1,
//               width: "fit-content",
//             },
//             {
//               duration: 0.05,
//               delay: stagger(0.05),
//               ease: "easeInOut",
//             }
//           );
  
//           // Backward deleting animation
//           await animate(
//             Array.from(scope.current.querySelectorAll("span")).reverse(),
//             {
//               opacity: 0,
//               width: "fit-content",
//             },
//             {
//               duration: 0.05,
//               delay: stagger(0.03),
//               ease: "easeInOut",
//             }
//           );
//         }
//       };
//       loopAnimation();
//     }
//   }, [isInView, animate, scope]);
  
  

//   const renderWords = () => {
//     return (
//       <motion.div ref={scope} className="inline">
//         {wordsArray.map((word, idx) => {
//           return (
//             <div key={`word-${idx}`} className="inline-block">
//               {word.text.map((char, index) => (
//                 <motion.span
//                   initial={{}}
//                   key={`char-${index}`}
//                   className={cn(
//                     `dark:text-white text-black opacity-0 hidden`,
//                     word.className
//                   )}
//                 >
//                   {char}
//                 </motion.span>
//               ))}
//               &nbsp;
//             </div>
//           );
//         })}
//       </motion.div>
//     );
//   };
//   return (
//     <div
//       className={cn(
//         "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
//         className
//       )}
//     >
//       {renderWords()}
//       <motion.span
//         initial={{
//           opacity: 0,
//         }}
//         animate={{
//           opacity: 1,
//         }}
//         transition={{
//           duration: 0.8,
//           repeat: Infinity,
//           repeatType: "reverse",
//         }}
//         className={cn(
//           "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
//           cursorClassName
//         )}
//       ></motion.span>
//     </div>
//   );
// };

// export const TypewriterEffectSmooth = ({
//   words,
//   className,
//   cursorClassName,
// }: {
//   words: {
//     text: string;
//     className?: string;
//   }[];
//   className?: string;
//   cursorClassName?: string;
// }) => {
//   // split text inside of words into array of characters
//   const wordsArray = words.map((word) => {
//     return {
//       ...word,
//       text: word.text.split(""),
//     };
//   });
//   const renderWords = () => {
//     return (
//       <div>
//         {wordsArray.map((word, idx) => {
//           return (
//             <div key={`word-${idx}`} className="inline-block">
//               {word.text.map((char, index) => (
//                 <span
//                   key={`char-${index}`}
//                   className={cn(`dark:text-white text-black `, word.className)}
//                 >
//                   {char}
//                 </span>
//               ))}
//               &nbsp;
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className={cn("flex space-x-1 my-6", className)}>
//       <motion.div
//         className="overflow-hidden pb-2"
//         initial={{
//           width: "0%",
//         }}
//         whileInView={{
//           width: "fit-content",
//         }}
//         transition={{
//           duration: 2,
//           ease: "linear",
//           delay: 1,
//         }}
//       >
//         <div
//           className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
//           style={{
//             whiteSpace: "nowrap",
//           }}
//         >
//           {renderWords()}{" "}
//         </div>{" "}
//       </motion.div>
//       <motion.span
//         initial={{
//           opacity: 0,
//         }}
//         animate={{
//           opacity: 1,
//         }}
//         transition={{
//           duration: 0.8,
//           repeat: Infinity,
//           repeatType: "reverse",
//         }}
//         className={cn(
//           "block rounded-sm w-[4px]  h-4 sm:h-6 xl:h-12 bg-blue-500",
//           cursorClassName
//         )}
//       ></motion.span>
//     </div>
//   );
// };


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

        // Typing forward
        await animate(
          spans,
          { opacity: 1 },
          {
            duration: 0.05,
            delay: staggerDelayBetweenWords(spans),
            ease: "easeInOut",
          }
        );

        // Pause after full line
        await new Promise((res) => setTimeout(res, 3000));

        // Backspacing
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
