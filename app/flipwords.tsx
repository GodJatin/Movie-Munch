import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export function FlipWordsDemo() {
  const words = ["Free", "No ads", "Quality Content"];

  return (
    <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Movie Munch Is
        <FlipWords words={words} /> <br />
      </div>
    </div>
  );
}
