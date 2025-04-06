import { Movie } from "../app/home/components/types/Movie";

const TMDB_API_KEY = "4e839fb2bcd7ff2b574704596bb9e766";
const YOUTUBE_API_KEY = "AIzaSyDfo7kkFkgd4W_AeTFLqxbjfhxtNVeLULQ";

export async function fetchMovieTrailerAndDetails(title: string): Promise<Partial<Movie>> {
  try {
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`
    );
    const searchData = await searchRes.json();
    const item = searchData.results?.[0];
    if (!item) return {};

    const mediaType = item.media_type || "tv"; 
    const id = item.id;

    const detailsRes = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${TMDB_API_KEY}&language=en-US`
    );
    const details = await detailsRes.json();

    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        `${title} official trailer`
      )}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video&videoEmbeddable=true`
    );
    const ytData = await ytRes.json();
    const trailerVideoId = ytData.items?.[0]?.id?.videoId;

    return {
      description: details.overview,
      genre: details.genres?.map((g: any) => g.name),
      duration: details.episode_run_time?.[0] || details.runtime,
      releaseYear: (details.first_air_date || details.release_date || "").slice(0, 4),
      trailerUrl: trailerVideoId ? `https://www.youtube.com/watch?v=${trailerVideoId}` : undefined,
    };
  } catch (error) {
    console.error("Error fetching trailer/details:", error);
    return {};
  }
}
