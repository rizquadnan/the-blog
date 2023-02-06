import { fetcher } from "../fetcher";
import { TCreateCommentPayload } from "./comments";

type TCreatePostArgs = {
  payload: TCreateCommentPayload;
  postId: number;
};
export function createComment(args: TCreatePostArgs) {
  return fetcher.post(`/posts/${args.postId}/comments`, args.payload);
}
