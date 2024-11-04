import { create } from "zustand";

import {
  fetchMovies,
  createMovies,
  updateMovies,
  deleteMovies,
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
      return moviesData.data;
    } catch (error) {
      set({ fetchError: error.message, isLoading: false });
    }
  },

  addMyList: async (movie) => {
    try {
      await createMovies(movie);
      set((state) => ({ ...state, isLoading: true }));
      await useStore.getState().fetchMyList();
    } catch (error) {
      console.error("Failed to add movie:", error);
      set({ error: "Failed to add movie" });
    }
  },

  deleteMyList: async (movie) => {
    try {
      await deleteMovies(movie);
      set((state) => ({ ...state, isLoading: true }));
      await useStore.getState().fetchMyList();
    } catch (error) {
      console.error("Failed to delete movie:", error);
      set({ error: "Failed to delete movie" });
    }
  },

  updateMyList: async (movieId, id, updatedMovie) => {
    try {
      const update = await updateMovies(movieId, id, updatedMovie);
      await useStore.getState().fetchMyList();
      return update;
    } catch (error) {
      console.error("Failed to update movie:", error);
      set({ error: "Failed to update movie" });
    }
  },
}));
