import { fetcher } from "../fetcher";
import { TUpdatePostPayload } from "./posts";

type TUpdatePostArgs = {
  payload: TUpdatePostPayload;
  postId: number;
};
export function updatePost(args: TUpdatePostArgs) {
  return fetcher.put(`/posts/${args.postId}`, args.payload);
}
