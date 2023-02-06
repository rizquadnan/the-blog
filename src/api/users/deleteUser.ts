import { fetcher } from "../fetcher";

type TDeleteUserArgs = {
  userId: number;
};
export function deleteUser(args: TDeleteUserArgs) {
  return fetcher.delete(`/users/${args.userId}`);
}
