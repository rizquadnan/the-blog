import { AxiosResponse } from 'axios'
import useSwrInfinite from 'swr/infinite'
import { fetcher, TPagination } from '../fetcher'
import {
  getLoadedUntilItemNumber,
  getTotalItemsFromResponse,
} from '../fetcher/utils'
import { TComment } from './comments'

type TUseCommentsReturnVal = {
  comments: TComment[]
  error: any
  isLoading: boolean
  refreshComments: () => void
  pagination: TPagination
}
type TUsePostsArgs = {
  postId: number | null
  perPage?: number
  onErrorCallback: (err: unknown) => void
}
export function useComments({
  postId,
  perPage = 5,
  onErrorCallback,
}: TUsePostsArgs): TUseCommentsReturnVal {
  const { data: res, error, isLoading, setSize, size, mutate } = useSwrInfinite<
    AxiosResponse<TComment[]>
  >(
    (index) =>
      postId
        ? `/posts/${postId}/comments?page=${index + 1}&per_page=${perPage}`
        : null,
    (url) => fetcher.get(url),
    {
      onError: onErrorCallback,
    },
  )

  const comments: TComment[] = []
  res?.forEach(({ data }) => {
    comments?.push(...data)
  })

  console.log(
    'getLoadedUntilItemNumber(size, perPage)',
    getLoadedUntilItemNumber(size, perPage),
  )
  console.log(
    'getTotalItemsFromResponse(res?.[0])',
    getTotalItemsFromResponse(res?.[0]),
  )

  return {
    comments,
    error,
    isLoading: Boolean(
      isLoading || (size > 0 && res && typeof res[size - 1] === 'undefined'),
    ),
    refreshComments: () => mutate(),
    pagination: {
      hasMore:
        getLoadedUntilItemNumber(size, perPage) <=
          getTotalItemsFromResponse(res?.[0]) &&
        comments.length !== getTotalItemsFromResponse(res?.[0]),
      totalItems: getTotalItemsFromResponse(res?.[0]),
      nextPage: () => setSize(size + 1),
      prevPage: () => setSize(size - 1),
    },
  }
}
