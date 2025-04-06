"use client";
import React from "react";

interface Movie {
  id: number;
  title: string;
  poster: string;
  trailer: string;
  description: string;
}

const MovieCard: React.FC<{ movie: Movie; onClick: () => void }> = ({ movie, onClick }) => {
  return (
    <div 
      className="relative border border-transparent hover:border-blue-400 transition duration-300 rounded-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
      <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2 w-full text-center">
        {movie.title}
      </div>
    </div>
  );
};

export default MovieCard;
