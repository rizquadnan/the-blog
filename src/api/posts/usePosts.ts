import { AxiosResponse } from "axios";
import useSwrInfinite from "swr/infinite";
import { fetcher, TPagination } from "../fetcher";
import {
  getLoadedUntilItemNumber,
  getTotalItemsFromResponse,
} from "../fetcher/utils";
import { TPost } from "./posts";

type TUsePostsReturnValue = {
  posts: TPost[];
  error: any;
  isLoading: boolean;
  pagination: TPagination;
};
type TUsePostsArgs = {
  perPage?: number;
  onErrorCallback?: (err: unknown) => void;
};
export function usePosts({
  perPage = 5,
  onErrorCallback,
}: TUsePostsArgs): TUsePostsReturnValue {
  const {
    data: res,
    error,
    isLoading,
    setSize,
    size,
  } = useSwrInfinite<AxiosResponse<TPost[]>>(
    (index) => `/posts?page=${index + 1}&per_page=${perPage}`,
    (url) => fetcher.get(url)
  );

  const posts: TPost[] = [];
  res?.forEach(({ data }) => {
    posts.push(...data);
  });

  return {
    posts: posts,
    error,
    isLoading: Boolean(
      isLoading || (size > 0 && res && typeof res[size - 1] === "undefined")
    ),
    pagination: {
      hasMore:
        getLoadedUntilItemNumber(size, perPage) <
        getTotalItemsFromResponse(res?.[0]),
      totalItems: getTotalItemsFromResponse(res?.[0]),
      nextPage: () => setSize(size + 1),
      prevPage: () => setSize(size - 1),
    },
  };
}
