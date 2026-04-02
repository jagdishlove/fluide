import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleMatchChange = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMatchChange);
    return () => mediaQuery.removeEventListener("change", handleMatchChange);
  }, [query]);

  return matches;
}
