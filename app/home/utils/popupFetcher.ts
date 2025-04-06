import { Movie } from "../components/types/Movie";
import { fetchYouTubeTrailer } from "../utils/youtubeTrailerFetcher";
import { fetchStreamingLink as fetchStreamingUrl } from "./streamingFetcher";

export const fetchMoviePopupData = async (movie: Movie): Promise<Partial<Movie>> => {
  const [trailerUrl, streamingUrl] = await Promise.all([
    fetchYouTubeTrailer(movie.title),
    fetchStreamingUrl(movie.title),
  ]);

  return {
    trailerUrl: trailerUrl || undefined,
    description: movie.description,
    genre: movie.genre, 
    releaseYear: movie.releaseYear || "2023",
    language: movie.language || "English",
    cast: movie.cast,
    duration: movie.duration || "120 min",
    rating: movie.rating || "7.5",
    streamingUrl: streamingUrl || undefined,
  };
};
