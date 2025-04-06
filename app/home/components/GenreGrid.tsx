"use client";
import React from "react";

interface GenreGridProps {
  genres: string[];
}

const GenreGrid: React.FC<GenreGridProps> = ({ genres }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">Movie Genres</h2>
      <div className="grid grid-cols-3 gap-4">
        {genres.map((genre) => (
          <button key={genre} className="bg-gray-700 p-4 rounded text-white">
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreGrid;
