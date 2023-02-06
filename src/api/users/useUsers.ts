import { AxiosResponse } from "axios";
import useSwrInfinite from "swr/infinite";
import { fetcher, TPagination } from "../fetcher";
import {
  getLoadedUntilItemNumber,
  getTotalItemsFromResponse,
} from "../fetcher/utils";
import { TSearchParamsUsers, TUser } from "./users";
import { normalizeUser } from "./utils";

type TUseUsersReturnValue = {
  users: TUser[];
  error: any;
  isLoading: boolean;
  refreshUsers: () => void;
  pagination: TPagination;
};
type TUseUsersArgs = {
  searchParams?: TSearchParamsUsers;
  perPage?: number;
  onErrorCallback?: (err: unknown) => void;
};

function appendWithSearchParams(
  baseUrl: string,
  searchParams?: TSearchParamsUsers
) {
  const _searchParams = searchParams ?? {};
  const paramsKey =
    Object.keys(_searchParams).length > 0 ? Object.keys(_searchParams) : [];
  const params = paramsKey.reduce((acc, cur) => {
    return `${acc}&${cur}=${_searchParams[cur as keyof TUser]}`;
  }, "");

  return `${baseUrl}${params}`;
}

export function useUsers({
  perPage = 5,
  onErrorCallback,
  searchParams,
}: TUseUsersArgs): TUseUsersReturnValue {
  const {
    data: res,
    error,
    isLoading,
    setSize,
    size,
    mutate,
  } = useSwrInfinite<AxiosResponse<TUser[]>>(
    (index) =>
      appendWithSearchParams(
        `/users?page=${index + 1}&per_page=${perPage}`,
        searchParams
      ),
    (url) => fetcher.get(url),
    { onError: (err) => onErrorCallback?.(err) }
  );

  const users: TUser[] = [];
  res?.forEach(({ data }) => {
    users.push(...data);
  });

  return {
    users: users.map(normalizeUser),
    error,
    isLoading: Boolean(
      isLoading || (size > 0 && res && typeof res[size - 1] === "undefined")
    ),
    refreshUsers: () => mutate(),
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
