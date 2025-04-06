"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Movie } from "../components/types/Movie";

interface TrendingCarouselProps {
  onMovieClick: (movie: Movie) => void;
  onWatchNow?: (title: string, url: string) => void;
}
interface Props {
    onClickMovie: (movie: Movie) => void;
    onWatchNow?: (title: string, url: string) => void;
  }
  

const trendingMovies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    genre: "Sci-Fi",
    year: "2010",
    rating: "8.8",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRyuWmayVBvqjd1MxTKpRgauq2cCtUzb7Q9QvaFTkAuxAU_EYMoCE3wBuJeftxIzf0grreIw",
    description: "A thief who steals corporate secrets through dream-sharing tech.",
    streamingUrl: "", // Optional
  },
  {
    id: "2",
    title: "The Dark Knight",
    genre: "Action",
    year: "2008",
    rating: "9.0",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfE_qrYMBZ_JB8om-34WGaZARhpX26yWRttqIDvn4_7l--UzX8mxKcPrc59IcvTpEA_G8gPA",
    description: "Batman battles the Joker in Gotham.",
    streamingUrl: "",
  },
  {
    id: "3",
    title: "Interstellar",
    genre: "Sci-Fi",
    year: "2014",
    rating: "8.6",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngBJ0B7UDrLUkDlp6DCQLsEYuWR-DiHwbnxFFCniB3HiP3f3NZmR1-lKSC34ge6YXu4LX",
    description: "Explorers travel through a wormhole in space.",
    streamingUrl: "",
  },
  {
    id: "4",
    title: "Avengers: Endgame",
    genre: "Action",
    year: "2019",
    rating: "8.4",
    image: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    description: "The Avengers assemble for the final battle against Thanos.",
    streamingUrl: "",
  },
  {
    id: "5",
    title: "Gladiator",
    genre: "Drama",
    year: "2000",
    rating: "8.5",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjzT2Ev_J0xtCX_zOC56YPL9zwt4PhFu79jO171BhtfCNYUI4SFo9dmwqJkw1753NUYvMuKg",
    description: "A Roman general seeks revenge as a gladiator.",
    streamingUrl: "",
  },
];

const TrendingCarousel: React.FC<Props> = ({ onClickMovie, onWatchNow }) => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);
  
    return (
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">🔥 Trending Movies</h2>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {trendingMovies.map((movie, index) => (
              <div
                key={index}
                className="min-w-[200px] md:min-w-[240px] lg:min-w-[300px] px-2"
                onClick={() => onClickMovie(movie)}
              >
                <div className="rounded-lg overflow-hidden bg-gray-800 shadow-md hover:scale-105 transition cursor-pointer">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="object-cover w-full h-[400px]"
                  />
                  <div className="p-2 text-white">
                    <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
                    <p className="text-sm text-gray-400">{movie.genre} | {movie.year}</p>
                    <p className="text-yellow-400">⭐ {movie.rating}</p>
                    {movie.streamingUrl && movie.streamingUrl !== "" && onWatchNow && (
                    <button
                        onClick={() => onWatchNow(movie.title, movie.streamingUrl!)}
                        className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded"
                    >
                        Watch Now
                    </button>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default TrendingCarousel;