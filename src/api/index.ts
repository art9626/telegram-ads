import { retrieveLaunchParams } from "@tma.js/sdk-react";
import axios, { AxiosResponse } from "axios";
import { Endpoints } from "./Endpoints";

export const apiClient = axios.create({
  baseURL: Endpoints.BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

let refreshPromise: Promise<
  AxiosResponse<{ data: { token: string } }, unknown>
> | null = null;

let queue: Array<(value: void) => void> = [];

apiClient.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (refreshPromise) {
      await new Promise<void>((res) => queue.push(res));
      return apiClient.request(originalRequest);
    }

    // TODO добавить кейс "если токен изменился"

    if (response.status === 401 && config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      const { initData } = retrieveLaunchParams();
      if (!initData) throw new Error("Init data is empty");
      const payload = {
        ...initData,
        authDate: new Date(initData.authDate).getTime(),
      };
      if (initData["chatInstance"]) {
        // @ts-expect-error fix
        payload.chatInstance = parseInt(initData["chatInstance"]);
      }

      try {
        const promise = axios.post<{ data: { token: string } }>(
          `${Endpoints.AUTH}`,
          payload
        );
        refreshPromise = promise;
        const res = await promise;
        localStorage.setItem("token", res.data.data.token);
        refreshPromise = null;
        queue.forEach((res) => res());
        queue = [];
        return apiClient.request(originalRequest);
      } catch (e) {
        window.location.reload();
      }
    }

    throw error;
  }
);
