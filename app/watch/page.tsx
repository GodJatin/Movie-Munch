"use client";
import { Suspense } from 'react';
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchStreamingLink } from "../home/utils/streamingFetcher";

const WatchPage = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const platform = searchParams.get("platform");
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadStream = async () => {
      if (!title) return;

      try {
        const url = await fetchStreamingLink(title);
        if (url) {
          setStreamUrl(url);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching streaming link:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadStream();
  }, [title]);

  if (loading) {
    return <div className="text-center text-white mt-20">Loading stream...</div>;
  }

  if (error || !streamUrl) {
    return (
      <div className="text-center text-red-500 mt-20">
        Movie not available for streaming. Please try another title.
      </div>
    );
  }

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (url.includes("archive.org")) {
      return url.replace("/details/", "/embed/");
    } else {
      return url; // SuperEmbed or other embed links
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-screen bg-black text-white flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {platform && <p className="mb-2 text-sm text-gray-400">Source: {platform}</p>}
      <div className="w-full max-w-6xl aspect-video rounded overflow-hidden shadow-xl">
        <iframe
          src={getEmbedUrl(streamUrl)}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full border-none"
        ></iframe>
      </div>
    </div>
    </Suspense>
    
  );
};

export default WatchPage;
