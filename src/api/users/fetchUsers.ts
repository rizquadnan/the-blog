import { fetcher } from "../fetcher";
import { TUser } from "./users";

type TFetchPostsArgs = {
  page?: number;
  per_page?: number;
};
export function fetchPosts(args?: TFetchPostsArgs) {
  const page = args?.page ?? 0;
  const per_page = args?.per_page ?? 0;

  return fetcher.get<TUser[]>("/users", { params: { page, per_page } });
}
