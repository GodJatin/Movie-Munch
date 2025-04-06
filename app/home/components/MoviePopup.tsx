// components/MoviePopup.tsx
import React, { useEffect, useState } from "react";
import MovieDetailsModal from "./MovieDetailsModal";
import { Movie } from "./types/Movie";
import { fetchMovieDetailsAndTrailer } from "../utils/fetchMovieDetailsAndTrailer";

interface MoviePopupProps {
  movie: Movie;
  onClose: () => void;
  onWatchNow: (title: string, url: string) => void;
}

const MoviePopup: React.FC<MoviePopupProps> = ({ movie, onClose, onWatchNow }) => {
  const [loading, setLoading] = useState(true);
  const [detailedMovie, setDetailedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      const enrichedMovie = await fetchMovieDetailsAndTrailer(movie.title);
      setDetailedMovie(enrichedMovie);
      setLoading(false);
    };

    loadDetails();
  }, [movie.title]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <MovieDetailsModal
      isOpen={true}
      movie={detailedMovie || movie}
      onClose={onClose}
      onWatchNow={onWatchNow}
    />
  );
};

export default MoviePopup;
