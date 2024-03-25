import { useEffect, useRef, useState } from "react";
import Star from "./Star";
import movieTrailer from "movie-trailer";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { KEY } from "./App";

export function MovieDetails({
  selectedID,
  setSelectedId,
  movie,
  setMovie,
  watched,
  setWatched,
  userRating,
  setUserRating,
  handleModal,
  setvideoURL,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const countRef = useRef(0);

  function handlevideo() {
    handleModal();
    movieTrailer(movie.Title).then((res) => {
      setvideoURL(res);
    });
  }

  useEffect(
    function () {
      if (userRating) {
        countRef.current = countRef.current + 1;
        console.log(countRef.current);
      }
    },
    [userRating]
  );

  const watchedMovieRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.UserRatings;
  useEffect(() => {
    setIsLoading(true);

    async function getFullMovieDetail() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data = await res.json();

        setMovie(() => data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    }

    getFullMovieDetail();
  }, [selectedID, setMovie]);

  function handleWatch() {
    setWatched([
      ...watched,
      { ...movie, UserRatings: userRating, ratingAttempt: countRef.current },
    ]);
    setSelectedId(null);
    setUserRating(0);
  }
  function handleClose() {
    setSelectedId(null);
    setMovie([]);
  }
  console.log(userRating);
  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        handleClose();
      }
    }
    document.addEventListener("keydown", callback);
    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [setMovie, setSelectedId]);

  return (
    <>
      {isLoading && !error && <Loader />}

      {error ? (
        <Error message={error} />
      ) : (
        !isLoading && (
          <div className="details">
            <header>
              <button className="btn-back" onClick={handleClose}>
                &larr;
              </button>
              <img src={movie.Poster} alt={movie.imdbId}></img>
              <div className="details-overview">
                <h2>{movie.Title}</h2>
                <p>
                  {movie.Released} &bull;{movie.Runtime}
                </p>
                <p>{movie.Genre}</p>
                <p>
                  <span>⭐</span>
                  {movie.imdbRating} IMDB Rating
                </p>
                <button onClick={handlevideo} className="btn-trailer-watch">
                  Click To Play Trailer
                </button>
              </div>
            </header>
            <section>
              <div className="rating">
                {!watchedMovieRating ? (
                  <Star
                    max="10"
                    setRating={setUserRating}
                    rating={userRating}
                  />
                ) : (
                  <>
                    <p>You Rated The Movie {watchedMovieRating}</p>
                    <p className="watched">WATCHED</p>
                  </>
                )}
              </div>
              {!watchedMovieRating && !userRating && (
                <p> Rate To Add To List</p>
              )}
              {userRating ? (
                <button className="btn-add" onClick={handleWatch}>
                  + Add to WatchList
                </button>
              ) : (
                ""
              )}
              <p>
                <em>{movie.Plot}</em>
              </p>
              <p>Staring actors: {movie.Actors}</p>
              <p>Directed By: {movie.Director}</p>
            </section>
          </div>
        )
      )}
    </>
  );
}
