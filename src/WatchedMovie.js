export function WatchedMovie({ watched, setWatched, setSelectedId }) {
  function handleDelete(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }

  function handleWatchDetail(id) {
    setSelectedId(id);
  }

  return (
    <>
      {watched?.map((movie) => (
        <li key={movie.imdbID}>
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            onClick={() => handleWatchDetail(movie.imdbID)}
          />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.UserRatings}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.Runtime.split(" ")[0]} minutes</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => handleDelete(movie.imdbID)}
            >
              &times;
            </button>
          </div>
        </li>
      ))}
    </>
  );
}
