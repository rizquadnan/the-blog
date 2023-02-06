import useSwr from "swr";
import { fetcher } from "../fetcher";
import { TPost } from "./posts";

type TUsePostArgs = {
  postId: number | null;
  onErrorCallback: () => void;
};
type TUsePostReturnVal = {
  post: TPost;
  isLoading: boolean;
  refetchPost: () => void;
};
export function usePost(args: TUsePostArgs): TUsePostReturnVal {
  const { data, isLoading, mutate, error } = useSwr<TPost>(
    args.postId !== null ? `/posts/${args.postId}` : null,
    (url) => fetcher(url).then((res) => res.data),
    {
      onError: args.onErrorCallback,
    }
  );

  return {
    post: data ?? { body: "", id: 0, title: "", user_id: 0 },
    isLoading,
    refetchPost: () => mutate(),
  };
}
