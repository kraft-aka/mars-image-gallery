import axios from "axios";

export default function fetchImages() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=10&api_key=${apiKey}`;
  return axios
    .get(url, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Content-Type": "application*json",
        "Access-Control-Allow-Credentials": "true",
      },
    })
    .then((response) => response.data);
}
