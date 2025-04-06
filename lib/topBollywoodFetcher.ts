import { Movie } from "../app/home/components/types/Movie";
import { fetchYouTubeTrailer } from "../app/home/utils/youtubeTrailerFetcher";
import { fetchStreamingLink } from "../app/home/utils/streamingFetcher";

const TMDB_API_KEY = "4e839fb2bcd7ff2b574704596bb9e766";

export async function fetchTopBollywood(): Promise<Movie[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=hi&sort_by=vote_average.desc&page=1`
  );
  const data = await response.json();
  if (!data.results) return [];

  const movies: Movie[] = await Promise.all(
    data.results.slice(0, 10).map(async (movie: any) => {
      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const movieData = await detailsRes.json();

      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}`
      );
      const credits = await creditsRes.json();

      const trailerUrl = await fetchYouTubeTrailer(movie.title);
      const streamingUrl = await fetchStreamingLink(movie.title);

      return {
        title: movie.title,
        image: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/300x450?text=No+Image",
        description: movie.overview,
        rating: movie.vote_average ? movie.vote_average.toFixed(1) : undefined,
        duration: movie.runtime ? `${movie.runtime} min` : undefined,
        genre: movieData.genres && Array.isArray(movieData.genres)
          ? movieData.genres.map((g: any) => g.name).join(", ")
          : undefined,
        cast: credits.cast && Array.isArray(credits.cast)
          ? credits.cast.slice(0, 5).map((actor: any) => actor.name).join(", ")
          : undefined,
        releaseYear: movie.release_date ? movie.release_date.slice(0, 4) : undefined,
        language: movie.original_language ? movie.original_language.toUpperCase() : undefined,
        trailerUrl: trailerUrl || undefined,
        streamingUrl: streamingUrl || undefined,
      };
    })
  );

  return movies;
}
