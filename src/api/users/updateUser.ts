import { fetcher } from "../fetcher";
import { TUpdateUserPayload } from "./users";

type TUpdateUserArgs = {
  payload: TUpdateUserPayload;
  userId: number;
};
export function updateUser(args: TUpdateUserArgs) {
  return fetcher.put(`/users/${args.userId}`, args.payload);
}
