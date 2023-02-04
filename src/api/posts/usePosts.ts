import useSWR from "swr";
import { fetchPosts } from "./fetchPosts";
import { TPost } from "./posts";

type TUsePostsReturnValue = {
  posts: TPost[],
  error: any,
  isLoading: boolean
}
export function usePosts(): TUsePostsReturnValue {
  const { data, error, isLoading } = useSWR<TPost[]>("/posts", () =>
    fetchPosts().then(res => res.data)
  );

  return {
    posts: data ?? [],
    error,
    isLoading,
  };
}
