import { apiClient } from "../apiClient";

export const fetchBerandaMovies = async () => {
  const response = await apiClient.get(`/movies`);
  return response.data;
};
