"use client";
import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { fetchStreamingLink } from "../utils/streamingFetcher";
import { Movie } from "./types/Movie"; 

interface MovieSearchProps {
  onMovieClick: (movie: Movie) => void;
  onWatchNow: (title: string, url: string) => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onWatchNow }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResults([]);

    const res = await axios.get(`https://www.omdbapi.com/?apikey=d2348149&s=${query}`);
    if (!res.data.Search) {
      setLoading(false);
      return;
    }

    const filtered = res.data.Search.filter(
      (item: any) => item.Type === "movie" || item.Type === "series"
    );

    const enriched = await Promise.all(
      filtered.map(async (movie: any) => {
        const link = await fetchStreamingLink(movie.Title);
        return {
          ...movie,
          streamingUrl: link,
        };
      })
    );

    setResults(enriched.filter((item) => item.streamingUrl));
    setLoading(false);
  };

  return (
    <div className="mb-8">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by movie or series title..."
          className="p-2 rounded w-full bg-gray-700 text-white"
        />
        <button onClick={searchMovies} className="bg-red-600 text-white px-4 py-2 rounded">
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {results.map((movie, idx) => (
          <MovieCard
            key={idx}
            movie={{
              title: movie.Title,
              image: movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg",
              description: movie.Year,
              streamingUrl: movie.streamingUrl, 
            }}
            onClick={() => {}}
            onWatchNow={() => onWatchNow(movie.Title, movie.streamingUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
