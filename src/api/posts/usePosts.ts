import { useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useState } from "react";
import useSWR from "swr";
import { TPagination } from "../fetcher";
import {
  getLoadedUntilItemNumber,
  getTotalItemsFromResponse,
} from "../fetcher/utils";
import { fetchPosts } from "./fetchPosts";
import { TPost } from "./posts";

type TUsePostsReturnValue = {
  posts: TPost[];
  error: any;
  isLoading: boolean;
  pagination: TPagination;
};
type TUsePostsArgs = {
  initialPage?: number;
  initialPerPage?: number;
  onErrorCallback?: (err: unknown) => void;
};
export function usePosts({
  initialPage = 1,
  initialPerPage = 5,
  onErrorCallback,
}: TUsePostsArgs): TUsePostsReturnValue {
  const [posts, setPosts] = useState<TPost[]>(() => []);

  const [page, setPage] = useState(() => initialPage);
  const [per_page] = useState(() => initialPerPage);
  const [loadedUntilItemNumber, setLoadedUntilItemNumber] = useState(
    () => initialPage * initialPerPage
  );
  const [totalItems, setTotalItems] = useState(() => 0);

  const {
    data: res,
    error,
    isLoading,
  } = useSWR<AxiosResponse<TPost[]>>(
    ["/posts", page, per_page],
    () => fetchPosts({ page, per_page }),
    {
      onSuccess: (res) => {
        setPosts((prev) => {
          return [...prev, ...(res.data ?? [])];
        });

        setTotalItems(getTotalItemsFromResponse(res));

        setLoadedUntilItemNumber(getLoadedUntilItemNumber(page, per_page));
      },
      onError: (err) => {
        onErrorCallback?.(err);
      },
    }
  );

  return {
    posts,
    error,
    isLoading,
    pagination: {
      hasMore: loadedUntilItemNumber < totalItems,
      totalItems,
      nextPage: () => setPage((prev) => prev + 1),
      prevPage: () => setPage((prev) => prev - 1),
    },
  };
}
