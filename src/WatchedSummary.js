import { average } from "./App";

export function WatchedSummary({ watched }) {
  const avgImdbRating = parseFloat(
    String(average(watched?.map((movie) => movie.imdbRating)))
  ).toFixed(2);
  const avgUserRating = average(
    watched?.map((movie) => movie.UserRatings)
  ).toFixed(2);
  const avgRuntime = parseFloat(
    String(average(watched?.map((movie) => movie.Runtime.split(" ")[0])))
  ).toFixed(2);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched?.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} minutes</span>
        </p>
      </div>
    </div>
  );
}
