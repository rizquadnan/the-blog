import { fetcher } from "../fetcher";
import { TPost } from "./posts";

export function fetchPosts() {
  return fetcher.get<TPost[]>('/posts')
}