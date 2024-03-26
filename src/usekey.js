import { useEffect } from "react";
export default function useKey(key, action) {
  useEffect(() => {
    function callback(e) {
      if (e.code === key) {
        action();
      }
    }
    const handleKeyDown = (event) => {
      callback(event);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [action, key]);
}
