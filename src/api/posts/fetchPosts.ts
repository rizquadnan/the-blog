import { fetcher } from "../fetcher";
import { TPost } from "./posts";

type TFetchPostsArgs = {
  page?: number;
  per_page?: number;
};
export function fetchPosts(args?: TFetchPostsArgs) {
  const page = args?.page ?? 0;
  const per_page = args?.per_page ?? 0;

  return fetcher.get<TPost[]>("/posts", { params: { page, per_page } });
}
