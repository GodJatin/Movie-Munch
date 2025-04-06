"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TrendingCarousel from "./components/TrendingCarousel";
import MovieGridSection from "./components/MovieGridSection";
import MovieSearch from "./components/MovieSearch";
import ProfileModal from "./components/ProfileModal";
import WatchPlatformModal from "./components/WatchPlatformModal";
import MoviePopup from "./components/MoviePopup"; 
import { Movie } from "./components/types/Movie";
import { fetchTopSeries } from "@/lib/topSeriesFetcher"; // ✅ fixed import
import MovieCard from "./components/MovieCard";
import { fetchMovieTrailerAndDetails } from "@/lib/trailerFetcher";
import { fetchTopBollywood } from "@/lib/topBollywoodFetcher";
import { fetchTopHollywood } from "@/lib/topHollywoodFetcher";
import { fetchTopTollywood } from "@/lib/topTollywoodFetcher";
import ContentCard from "./components/common/ContentCard";
import ContentDetailsModal from "./components/common/ContentDetailsModal";


const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [topSeries, setTopSeries] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState<string | null>(null);
  const [bollywoodMovies, setBollywoodMovies] = useState<Movie[]>([]);
  const [hollywoodMovies, setHollywoodMovies] = useState<Movie[]>([]);
  const [tollywoodMovies, setTollywoodMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Movie[]>([]);

  // useEffect(() => {
  //   const loadSeries = async () => {
  //     const data = await fetchTopSeries();
  //     setTopSeries(data);
  //   };
  //   loadSeries();
  // }, []);

  useEffect(() => {
    // These fetchers should return a Promise<Movie[]>
    fetchTopBollywood().then(setBollywoodMovies);
    fetchTopHollywood().then(setHollywoodMovies);
    fetchTopTollywood().then(setTollywoodMovies);
    fetchTopSeries().then(setSeries);
  }, []);

  const handleCardClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
  };

  const handleWatchNow = (title: string, url: string) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!currentUser) {
      window.location.href = "/login";
    } else {
      setUser(currentUser);
    }
  }, []);

  if (!user) return null;

  return (
    <div className="relative bg-black text-white min-h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="w-full px-4 md:px-8 pt-24 pb-8 transition-all"> {/* ✅ Added pt-24 to prevent overlap */}
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} user={user} />

        <div className="mt-6 space-y-16">
        <TrendingCarousel onClickMovie={(movie) => setSelectedMovie(movie)} onWatchNow={handleWatchNow}/>
          {selectedMovie && (
            <MoviePopup movie={selectedMovie} onClose={() => setSelectedMovie(null)} onWatchNow={function (title: string, url: string): void {
              throw new Error("Function not implemented.");
            } } />
            )}
  

<div className="bg-black text-white min-h-screen p-4 space-y-12">
      {/* Top 10 Bollywood Movies */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Top 10 Bollywood Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {bollywoodMovies.map((movie, idx) => (
            <ContentCard key={idx} movie={movie} onClick={handleCardClick} />
          ))}
        </div>
      </section>

      {/* Top 10 Hollywood Movies */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Top 10 Hollywood Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {hollywoodMovies.map((movie, idx) => (
            <ContentCard key={idx} movie={movie} onClick={handleCardClick} />
          ))}
        </div>
      </section>

      {/* Top 10 Tollywood Movies */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Top 10 Tollywood Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tollywoodMovies.map((movie, idx) => (
            <ContentCard key={idx} movie={movie} onClick={handleCardClick} />
          ))}
        </div>
      </section>

      {/* Top 10 Series */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Top 10 Series</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {series.map((movie, idx) => (
            <ContentCard key={idx} movie={movie} onClick={handleCardClick} />
          ))}
        </div>
      </section>

      {/* Common Modal for Movie/Series Details */}
      {selectedMovie && (
        <ContentDetailsModal
          isOpen={!!selectedMovie}
          movie={selectedMovie}
          onClose={handleModalClose}
          onWatchNow={handleWatchNow}
        />
      )}
    </div>

          <div className="pt-12 border-t border-gray-700">
            <h2 className="text-3xl font-bold mb-4">🔍 Search Movies or Series</h2>
            <MovieSearch
              onMovieClick={(movie) => setSelectedMovie(movie)}
              onWatchNow={handleWatchNow}
            />
          </div>
        </div>
      </div>

      {selectedMovie && (
        <MoviePopup
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onWatchNow={handleWatchNow}
        />
      )}

      {/* {selectedMovieTitle && (
        <WatchPlatformModal
          movieTitle={selectedMovieTitle}
          onClose={() => setSelectedMovieTitle(null)}
          onPlatformSelect={handlePlatformSelect}
        />
      )} */}

      {isProfileOpen && (
        <ProfileModal onClose={() => setIsProfileOpen(false)} user={user} />
      )}
    </div>
  );
};

export default Home;
