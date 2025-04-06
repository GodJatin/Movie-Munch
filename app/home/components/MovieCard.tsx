import React from "react";
import { Movie } from "./types/Movie"; // Adjust the path if needed

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void; // ✅ Make it optional
  onWatchNow?: (title: string, url: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, onWatchNow }) => {
  const handleCardClick = () => {
    if (onClick) onClick(movie); // ✅ Prevent error if undefined
  };

  const handleWatchNow = (e: React.MouseEvent) => {
    e.stopPropagation(); // ⛔ Prevent opening popup when clicking Watch Now
    if (movie.streamingUrl && onWatchNow) {
      onWatchNow(movie.title, movie.streamingUrl);
    }
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition transform hover:scale-105 hover:ring-4 ring-red-500"
      onClick={handleCardClick}
    >
      <img
        src={movie.image || "https://via.placeholder.com/300x400?text=No+Image"}
        alt={movie.title}
        className="w-full h-60 object-cover"
      />
      <div className="p-2 bg-gray-800">
        <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
        {movie.streamingUrl && onWatchNow && (
          <button
            onClick={handleWatchNow}
            className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded"
          >
            Watch Now
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
