"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance"];

const Genres = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6">
        <h1 className="text-3xl font-bold">Top Movie Genres</h1>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {genres.map(genre => (
            <Link 
              key={genre} 
              href={`/genres/${genre.toLowerCase()}`} 
              className="p-4 bg-gray-700 text-white rounded-lg text-center hover:bg-gray-600"
            >
              {genre}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genres;
