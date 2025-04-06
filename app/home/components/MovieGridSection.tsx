import React from "react";
import MovieCard from "./MovieCard";
import { Movie } from "./types/Movie"; // adjust path if needed


interface MovieGridSectionProps {
  title: string;
  movies: Movie[];
  onWatchNow?: (title: string, url: string) => void;
  onMovieClick: (movie: Movie) => void; // for popup/modal
}

const MovieGridSection: React.FC<MovieGridSectionProps> = ({
  title,
  movies,
  onWatchNow,
  onMovieClick,
}) => {
  return (
    <div className="w-full mt-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 border-l-4 border-red-500 pl-3">
        {title}
      </h2>

      {movies.length === 0 ? (
        <p className="text-gray-400">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie, index) => (
            <MovieCard
              key={`${movie.title}-${index}`}
              movie={{
                title: movie.title,
                image:
                  movie.image && movie.image !== "N/A"
                    ? movie.image
                    : "https://www.cyberpowerpc.com/blog/w/wp-content/uploads/2021/09/genshin-impact-raiden-shogun.jpg",
                description: movie.description || "No info",
                streamingUrl: movie.streamingUrl,
              }}
              onClick={() => onMovieClick(movie)}
              onWatchNow={
                movie.streamingUrl && onWatchNow
                  ? () => onWatchNow(movie.title, movie.streamingUrl!)
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieGridSection;
