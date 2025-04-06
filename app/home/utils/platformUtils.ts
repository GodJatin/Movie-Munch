export const fetchAvailablePlatforms = async (title: string): Promise<string[]> => {
    const encoded = encodeURIComponent(title);
    const platforms = [];
  
    const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encoded}+full+movie&type=video&key=AIzaSyDfo7kkFkgd4W_AeTFLqxbjfhxtNVeLULQ`);
    const ytData = await ytRes.json();
    if (ytData.items && ytData.items.length > 0) {
      platforms.push("YouTube");
    }
  
    const archiveRes = await fetch(`https://archive.org/advancedsearch.php?q=${encoded}&output=json`);
    const archiveData = await archiveRes.json();
    if (archiveData.response.docs.length > 0) {
      platforms.push("Internet Archive");
    }
  
    return platforms;
  };
  