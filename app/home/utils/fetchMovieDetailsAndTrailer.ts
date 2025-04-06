// utils/fetchMovieDetailsAndTrailer.ts
import { Movie } from "../components/types/Movie";

const TMDB_API_KEY = "4e839fb2bcd7ff2b574704596bb9e766";
const YOUTUBE_API_KEY = "AIzaSyDfo7kkFkgd4W_AeTFLqxbjfhxtNVeLULQ";

export async function fetchMovieDetailsAndTrailer(title: string): Promise<Movie> {
  try {
    // Step 1: Search TMDb for movie or series
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`
    );
    const searchData = await searchRes.json();
    const item = searchData.results?.[0];
    if (!item) throw new Error("No match found");

    const isTV = item.media_type === "tv";
    const detailsUrl = isTV
      ? `https://api.themoviedb.org/3/tv/${item.id}?api_key=${TMDB_API_KEY}&language=en-US`
      : `https://api.themoviedb.org/3/movie/${item.id}?api_key=${TMDB_API_KEY}&language=en-US`;

    const detailsRes = await fetch(detailsUrl);
    const details = await detailsRes.json();

    // Step 2: Get Trailer from YouTube
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        `${title} official trailer`
      )}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video`
    );
    const ytData = await ytRes.json();
    const trailerUrl = ytData.items?.[0]
      ? `https://www.youtube.com/watch?v=${ytData.items[0].id.videoId}`
      : undefined;

    // Step 3: Build enriched Movie object
    const enrichedMovie: Movie = {
      title: isTV ? details.name : details.title,
      image: details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Image",
      description: details.overview,
      genre: details.genres?.map((g: any) => g.name).join(", "),
      rating: details.vote_average?.toFixed(1),
      duration: isTV ? `${details.number_of_seasons} Season(s)` : `${details.runtime} mins`,
      cast: details.created_by?.map((c: any) => c.name).join(", ") || "",
      trailerUrl,
      releaseYear: (details.first_air_date || details.release_date || "").slice(0, 4),
      language: details.original_language?.toUpperCase(),
      streamingUrl: undefined,
    };

    return enrichedMovie;
  } catch (err) {
    console.error("Error fetching movie details:", err);
    return {
      title,
      image: "https://via.placeholder.com/300x450?text=No+Image",
      description: "Details unavailable",
      streamingUrl: undefined,
    };
  }
}
