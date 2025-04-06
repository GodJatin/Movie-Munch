"use client";
import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  const searchMovies = async () => {
    if (!query.trim()) return;

    const res = await axios.get(`https://www.omdbapi.com/?apikey=d2348149&s=${query}`);
    if (res.data.Search) {
      const filteredResults = res.data.Search.filter(
        (item: any) => item.Type === "movie" || item.Type === "series"
      );

      const detailedResults = await Promise.all(
        filteredResults.map(async (item: any) => {
          const details = await axios.get(`https://www.omdbapi.com/?apikey=d2348149&t=${item.Title}`);
          return {
            title: item.Title,
            image: item.Poster !== "N/A" ? item.Poster : "/placeholder.jpg",
            year: item.Year,
            description: details.data.Plot !== "N/A" ? details.data.Plot : "No description available.",
          };
        })
      );

      setResults(detailedResults);
    }
  };

  const handleWatchNow = async (title: string) => {
    const YOUTUBE_API_KEY = "AIzaSyDfo7kkFkgd4W_AeTFLqxbjfhxtNVeLULQ";
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        title + " full movie"
      )}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video`
    );

    if (response.data.items && response.data.items.length > 0) {
      const videoId = response.data.items[0].id.videoId;
      const url = `/watch?title=${encodeURIComponent(title)}&platform=youtube&id=${videoId}`;
      window.open(url, "_blank");
    } else {
      alert("No full movie available for this title right now.");
    }
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
          Search
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {results.map((movie, idx) => (
          <MovieCard
            key={idx}
            movie={{
              title: movie.title,
              image: movie.image,
              description: `${movie.year} • ${movie.description}`,
            }}
            onClick={() => {}}
            onWatchNow={handleWatchNow}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
