import axios from "axios";

export const PROD_URL = "https://game.botsquad.win";
export const BASE_URL = `${PROD_URL}/api/v1`;

export enum Endpoints {
  AUTH = `/auth`,
  USER = `${BASE_URL}/game/user`,
  GAME_INFO = `${BASE_URL}/game/info`,
  FRIENDS = `${BASE_URL}/game/user/friends`,
  UPGRADES = `${BASE_URL}/game/upgrades`,
  WATCHED = `${BASE_URL}/game/watched`,
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
