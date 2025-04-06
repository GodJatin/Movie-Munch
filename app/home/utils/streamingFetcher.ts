import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyDfo7kkFkgd4W_AeTFLqxbjfhxtNVeLULQ";
const ARCHIVE_SEARCH_URL = "https://archive.org/advancedsearch.php";
const SUPEREMBED_BASE = "https://multiembed.mov/directstream.php?video=";

const TRUSTED_CHANNELS = [
  { name: "T-Series", id: "UCq-Fj5jknLsUf-MWSy4_brA" },
  { name: "Shemaroo Gujarati Manoranjan", id: "UCpvuV0CUtBSPLquhP9-vQFw" },
  { name: "Shemaroo Movies", id: "UCLg5K1z9t5CeRfKvx7W8nDw" },
  { name: "Shemaroo", id: "UCX2KVZVr3p3Bi-XsS1yHI2w" },
  { name: "ShemarooMe USA", id: "UCJHNjS8FAYIxFz6T0zVvLgw" },
  { name: "Music, Movies & Gaana", id: "UCZ4j0FZh0vAXHT0z08E3Dng" },
];

export const fetchStreamingLink = async (title: string): Promise<string | null> => {
  for (const channel of TRUSTED_CHANNELS) {
    const ytRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        title + " full movie"
      )}&channelId=${channel.id}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video`
    );
    const items = ytRes.data.items;
    if (items && items.length > 0) {
      const videoId = items[0].id.videoId;
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
  }

  const archiveRes = await axios.get(
    `${ARCHIVE_SEARCH_URL}?q=${encodeURIComponent(
      title
    )}&fl[]=identifier&output=json&rows=1`
  );
  const docs = archiveRes.data.response.docs;
  if (docs && docs.length > 0) {
    return `https://archive.org/details/${docs[0].identifier}`;
  }

  const superembedUrl = SUPEREMBED_BASE + encodeURIComponent(title);
  try {
    const check = await axios.get(superembedUrl);
    if (check.status === 200) {
      return superembedUrl;
    }
  } catch (err) {
  }

  return null; 
};
