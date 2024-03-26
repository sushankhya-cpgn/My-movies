import { useRef } from "react";
import useKey from "./usekey";

export function Search({ query, setQuery }) {
  const inpEl = useRef(null);

  const key = "Enter";
  useKey(key, function () {
    if (document.activeElement === inpEl) return;
    setQuery("");
    inpEl.current.focus();
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inpEl}
    />
  );
}
