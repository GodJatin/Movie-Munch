"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export function TypewriterEffectSignupform() {
  const words = [
    {
      text: "Let's",
    },
    {
      text: "Get",
    },
    {
      text: "Started",
    },
    {
      text: "By",
    },
    {
      text: "Creating",
    },
    {
      text: "Your",
    },
    {
      text: "Free",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Account",
    },
  ];
  return (
    <div className="flex flex-col items-center text-2xl  justify-center  ">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}

