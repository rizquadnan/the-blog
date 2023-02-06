import { AxiosResponse } from "axios";

export function getTotalItemsFromResponse(res?: AxiosResponse): number {
  return res?.headers["x-pagination-total"]
    ? Number(res?.headers["x-pagination-total"])
    : 0;
}

export function getLoadedUntilItemNumber(
  page: number,
  per_page: number
): number {
  return page * per_page;
}
