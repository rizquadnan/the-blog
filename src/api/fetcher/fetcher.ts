import axios from "axios";
import {
  API_BASE_URL,
  FETCHER_TIMEOUT,
  FETCHER_DEV_RESPONSE_DELAY_IN_MS,
} from "./constant";

export function sleep(ms = FETCHER_DEV_RESPONSE_DELAY_IN_MS): Promise<void> {
  console.log(`[fetcher] fetch response delayed by ${ms} ms`);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetcher = axios.create({
  baseURL: API_BASE_URL,
  timeout: FETCHER_TIMEOUT,
  headers: {
    Authorization: `Bearer 753ed827c76481451267bf25a8e20b184624ed9990c89e84cebb7c9c549b92bb`,
  },
});

fetcher.interceptors.response.use(async (response) => {
  // add artificial delay for dev env
  if (process.env.NODE_ENV === "development") {
    await sleep();
  }
  return response;
});

export default fetcher;
