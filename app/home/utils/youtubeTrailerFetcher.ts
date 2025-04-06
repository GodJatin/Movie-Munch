// app/home/components/utils/youtubeTrailerFetcher.ts
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyDfo7kkFkgd4W_AeTFLqxbjfhxtNVeLULQ";

export const fetchYouTubeTrailer = async (title: string): Promise<string | null> => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          q: `${title} official trailer`,
          type: "video",
          key: YOUTUBE_API_KEY,
          maxResults: 1,
        },
      }
    );

    const video = response.data.items?.[0];
    if (video) {
      return `https://www.youtube.com/watch?v=${video.id.videoId}`;
    }
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }

  return null;
};
