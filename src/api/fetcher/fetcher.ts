import axios from "axios";
import { API_BASE_URL, FETCHER_TIMEOUT } from "./constant";

export const fetcher = axios.create({
  baseURL: API_BASE_URL,
  timeout: FETCHER_TIMEOUT,
});

export default fetcher