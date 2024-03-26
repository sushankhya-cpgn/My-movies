import { useEffect, useState } from "react";
import useMovies from "./useMovies";
import useLocationStorageState from "./useLocationStorageState";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { Navbar } from "./Navbar";
import { Logo } from "./Logo";
import { Modal } from "./Modal";
import { MovieDetails } from "./MovieDetails";
import { MovieList } from "./MovieList";
import { VideoBox, Box } from "./VideoBox";
import { Main } from "./Main";
import { Movie } from "./Movie";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedMovie } from "./WatchedMovie";
import { WatchList } from "./WatchList";
import { Results } from "./Results";
import { Search } from "./Search";

export const KEY = "66c729a6";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movie, setMovie] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocationStorageState([], "watched");

  const [modal, setModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  function handleModal() {
    setModal(!modal);
  }

  const { movies, selectedID, isLoading, error, setIsLoading, setSelectedId } =
    useMovies(query);
  function handleSetId(id) {
    //See
    id === selectedID
      ? (() => {
          setSelectedId(() => null);
          setMovie(() => []);
        })()
      : (() => {
          setSelectedId(() => id);
          setUserRating(0);
        })();
  }

  useEffect(() => {
    if (movie.length === 0) return;

    document.title = `Add to Watchlist| ${movie.Title}`;
    return function () {
      document.title = "My Movies";
    };
  }, [movie]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      {modal ? (
        <VideoBox>
          <Modal videoURL={videoUrl} handleModal={handleModal} />
        </VideoBox>
      ) : (
        <>
          <Navbar>
            <Logo />
            <Search query={query} setQuery={setQuery} />
            <Results movies={movies} />
          </Navbar>
          <Main>
            <>
              <Box>
                {!isLoading && error && <Error message={error} />}
                <MovieList>
                  {isLoading && <Loader />}
                  {!isLoading && !error && (
                    <Movie movies={movies} handleSetId={handleSetId} />
                  )}
                </MovieList>
              </Box>
              <Box>
                {selectedID ? (
                  <MovieDetails
                    selectedID={selectedID}
                    setSelectedId={setSelectedId}
                    setMovie={setMovie}
                    movie={movie}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    watched={watched}
                    setWatched={setWatched}
                    userRating={userRating}
                    setUserRating={setUserRating}
                    handleModal={handleModal}
                    setvideoURL={setVideoUrl}
                  />
                ) : (
                  <>
                    <WatchedSummary watched={watched} />
                    <WatchList>
                      <WatchedMovie
                        watched={watched}
                        setWatched={setWatched}
                        setSelectedId={setSelectedId}
                      />
                    </WatchList>
                  </>
                )}
              </Box>
            </>
          </Main>
        </>
      )}
    </>
  );
}
