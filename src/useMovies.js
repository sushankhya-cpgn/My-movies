import { useState, useEffect } from "react";

const KEY = "66c729a6";
export default function useMovies(query) {
  const [selectedID, setSelectedId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        console.log(res);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        if (data.Response === "False") {
          setIsLoading(false);
          setError("Movie not Found"); // Set error directly without throwing
          return;
        }

        setMovies(() => data.Search);
        console.log(data);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        if (err.name !== "AbortError") {
          setError(() => err.message);
        }
      } finally {
        setIsLoading(false);
      }
      // setError("");
    }
    setSelectedId(null);

    if (query.length <= 3) {
      setError("");
      setMovies([]);
      return;
    } else {
      fetchMovies();
    }
    return function () {
      controller.abort();
    };
  }, [query, setError]);

  return { movies, selectedID, isLoading, error, setIsLoading, setSelectedId };
}
