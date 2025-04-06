import React from "react";
import { Movie } from "@/app/home/components/types/Movie";

interface ContentCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ movie, onClick }) => {
  return (
    <div
      onClick={() => onClick(movie)}
      className="relative rounded-lg overflow-hidden shadow-md cursor-pointer transform transition-transform hover:scale-105 hover:ring-2 ring-red-500"
    >
      <img
        src={movie.image || "https://via.placeholder.com/300x450?text=No+Image"}
        alt={movie.title}
        className="w-full h-60 object-cover"
      />
      <div className="bg-gray-800 text-white p-2">
        <h3 className="text-base font-semibold truncate">{movie.title}</h3>
      </div>
    </div>
  );
};

export default ContentCard;
