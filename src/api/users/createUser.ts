import { fetcher } from "../fetcher";
import { TCreateUserPayload } from "./users";

type TCreateUserArgs = {
  payload: TCreateUserPayload;
};
export function createPost(args: TCreateUserArgs) {
  return fetcher.post("/users", args.payload);
}
