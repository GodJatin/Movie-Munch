const API_KEY = "d2348149";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMoviesByTitle = async (title: string) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${title}`);
  const data = await response.json();
  return data;
};

export const getMovieDetailsByTitle = async (title: string) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&t=${title}`);
  const data = await response.json();
  return data;
};

export const getMovieDetailsById = async (imdbID: string) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
  const data = await response.json();
  return data;
};
