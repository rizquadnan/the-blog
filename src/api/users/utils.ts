import { TUser } from "./users";

export function normalizeUser(
  dirtyUser: Record<string, string | number>
): TUser {
  return {
    id: Number(dirtyUser.id),
    email: String(dirtyUser.email),
    gender:
      dirtyUser.gender === "male" || dirtyUser.gender === "female"
        ? dirtyUser.gender
        : "male",
    status:
      dirtyUser.status === "active" || dirtyUser.status === "inactive"
        ? dirtyUser.status
        : "inactive",
    name: String(dirtyUser.name),
  };
}
