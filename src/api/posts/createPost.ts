import { fetcher } from "../fetcher";
import { TCreatePostPayload } from "./posts";

type TCreatePostArgs = {
  payload: TCreatePostPayload;
};
export function createPost(args: TCreatePostArgs) {
  return fetcher.post("/posts", args.payload);
}
