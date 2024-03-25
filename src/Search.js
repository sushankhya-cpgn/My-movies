import { useEffect, useRef } from "react";

export function Search({ query, setQuery }) {
  const inpEl = useRef(null);

  function callback(e) {
    if (document.activeElement === inpEl) {
      return;
    }
    if (e.code === "Enter") {
      setQuery("");
      inpEl.current.focus();
    }
  }
  useEffect(() => {
    if (document.activeElement === inpEl.current) {
      return;
    }
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };

    // inpEl.current.focus();
  }, [setQuery, callback]);
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
