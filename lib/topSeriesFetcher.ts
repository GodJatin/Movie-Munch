// topSeriesFetcher.ts
import { Movie } from "../app/home/components/types/Movie";
import { fetchYouTubeTrailer } from "../app/home/utils/youtubeTrailerFetcher";
import { fetchStreamingLink } from "../app/home/utils/streamingFetcher";

const TMDB_API_KEY = "4e839fb2bcd7ff2b574704596bb9e766";

export async function fetchTopSeries(): Promise<Movie[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`
  );

  const data = await response.json();
  if (!data.results) return [];

  const seriesList: Movie[] = await Promise.all(
    data.results.slice(0, 10).map(async (series: any) => {
      // Fetch extra details for genres etc.
      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/tv/${series.id}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const seriesData = await detailsRes.json();

      // Fetch cast info
      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/tv/${series.id}/credits?api_key=${TMDB_API_KEY}`
      );
      const credits = await creditsRes.json();

      // Fetch trailer and streaming link
      const trailerUrl = await fetchYouTubeTrailer(series.name);
      const streamingUrl = await fetchStreamingLink(series.name);

      return {
        title: series.name,
        image: series.poster_path
          ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
          : "https://via.placeholder.com/300x450?text=No+Image",
        description: series.overview,
        rating: series.vote_average ? series.vote_average.toFixed(1) : undefined,
        duration:
          series.episode_run_time && series.episode_run_time.length > 0
            ? `${series.episode_run_time[0]} min`
            : undefined,
        // Convert the genres array to a string
        genre: seriesData.genres && Array.isArray(seriesData.genres)
          ? seriesData.genres.map((g: any) => g.name).join(", ")
          : undefined,
        // Convert the cast array to a string
        cast: credits.cast && Array.isArray(credits.cast)
          ? credits.cast.slice(0, 5).map((actor: any) => actor.name).join(", ")
          : undefined,
        releaseYear: series.first_air_date
          ? series.first_air_date.slice(0, 4)
          : undefined,
        language: series.original_language
          ? series.original_language.toUpperCase()
          : undefined,
        trailerUrl: trailerUrl || undefined,
        streamingUrl: streamingUrl || undefined,
      };
    })
  );

  return seriesList;
}
