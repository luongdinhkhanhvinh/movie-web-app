import { useState, useEffect } from "react";
// API
// Helpers
import { isPersistedState } from "../helpers/helpers";
import movies from "../services/movies";
import { Movie } from "../types/movies";

const intialState = {
  page: 0,
  results: [] as Movie[],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(intialState);
  const [loading, setLoading] = useState(false);
  const [error, setEror] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page: number, searchTerm = "") => {
    try {
      setEror(false);
      setLoading(true);
      const moviesData = await movies.fetchMovies(searchTerm, page);
      setState((prev) => ({
        ...moviesData,
        results:
          page > 1
            ? [...prev.results, ...moviesData.results]
            : [...moviesData.results],
      }));
    } catch (error) {
      setEror(true);
    }
    setLoading(false);
  };

  // Initial
  useEffect(() => {
    fetchMovies(1);
  }, []);

  // Search
  useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistedState("homeState");

      if (sessionState) {
        console.log("GRABBING FROM SESSION STORAGE");
        setState(sessionState);
        return;
      }
    }
    setState(intialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load More Button
  useEffect(() => {
    if (!isLoadingMore) {
      return;
    }
    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  // Write to sessionStorage
  useEffect(() => {
    if (!searchTerm) {
      return sessionStorage.setItem("homeState", JSON.stringify(state));
    }
  }, [searchTerm, state]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
