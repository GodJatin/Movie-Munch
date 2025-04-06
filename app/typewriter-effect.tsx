"use client";

import { cn } from "@/lib/utils";
import { useAnimate } from "framer-motion";
import { useEffect, useRef } from "react";

type Word = {
  text: string;
  className?: string;
};

const lines: Word[][] = [
  [
    { text: "All" },
    { text: "Movies," },
    { text: "All" },
    { text: "Platform" },
  ],
  [
    { text: "One", className: "text-red-500" },
    { text: "Munch," },
    { text: "Movie", className: "text-red-500" },
    { text: "Munch", className: "text-red-500" },
  ],
];

export default function TypewriterEffectFull() {
  const [scope, animate] = useAnimate();
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animateTyping = async () => {
      const allSpans: HTMLSpanElement[] = [];
      const linesContainer = containerRef.current?.querySelectorAll(".type-line");

      linesContainer?.forEach((line) => {
        const spans = line.querySelectorAll("span[data-char]");
        spans.forEach((s) => allSpans.push(s as HTMLSpanElement));
      });

      while (true) {
        for (let i = 0; i < allSpans.length; i++) {
          const charSpan = allSpans[i];
          await animate(charSpan, { opacity: 1 }, { duration: 0.04 });

          if (cursorRef.current && charSpan) {
            const { left, top } = charSpan.getBoundingClientRect();
            const parentRect = scope.current.getBoundingClientRect();
            cursorRef.current.style.transform = `translate(${left - parentRect.left + charSpan.offsetWidth}px, ${top - parentRect.top}px)`;
          }

          if (charSpan.innerText === " " || i === allSpans.length - 1 || charSpan.nextSibling?.textContent?.trim() === "") {
            await new Promise((res) => setTimeout(res, 300));
          }
        }

        await new Promise((res) => setTimeout(res, 3000));

        for (let i = allSpans.length - 1; i >= 0; i--) {
          const charSpan = allSpans[i];
          await animate(charSpan, { opacity: 0 }, { duration: 0.03 });

          if (cursorRef.current && charSpan) {
            const { left, top } = charSpan.getBoundingClientRect();
            const parentRect = scope.current.getBoundingClientRect();
            cursorRef.current.style.transform = `translate(${left - parentRect.left}px, ${top - parentRect.top}px)`;
          }

          if (charSpan.innerText === " " || i === 0 || allSpans[i - 1]?.textContent?.trim() === "") {
            await new Promise((res) => setTimeout(res, 250));
          }
        }

        await new Promise((res) => setTimeout(res, 1500));
      }
    };

    animateTyping();
  }, [animate]);

  return (
    <div
      ref={scope}
      className="relative text-center text-xl sm:text-3xl lg:text-5xl font-bold mt-20"
    >
      <div ref={containerRef} className="inline-block">
        {lines.map((line, lineIdx) => (
          <div
            key={`line-${lineIdx}`}
            className="type-line flex justify-center space-x-2 mb-2"
          >
            {line.map((word, wordIdx) => (
              <div key={`word-${lineIdx}-${wordIdx}`} className="inline-block">
                {word.text.split("").map((char, charIdx) => (
                  <span
                    data-char
                    key={`char-${lineIdx}-${wordIdx}-${charIdx}`}
                    className={cn("opacity-0 inline-block dark:text-white text-black", word.className)}
                  >
                    {char}
                  </span>
                ))}
                <span data-char>&nbsp;</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <span
        ref={cursorRef}
        className="absolute top-0 left-0 w-[5px] h-12 bg-red-600 animate-pulse"
      ></span>
    </div>
  );
}
