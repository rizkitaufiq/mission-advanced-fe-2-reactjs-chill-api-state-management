import { create } from "zustand";
import {
  fetchMovies,
  // createMovies,
  // updateMovies,
  // deleteMovies,
} from "../services/profil/myListService.js";

export const useStore = create((set) => ({
  movies: [],
  isLoading: false,
  fetchError: null,

  fetchMyList: async () => {
    set({ isLoading: true, fetchError: null });
    try {
      const moviesData = await fetchMovies();
      set({ movies: moviesData, isLoading: false });
    } catch (error) {
      set({ fetchError: error.message, isLoading: false });
    }
  },
}));
