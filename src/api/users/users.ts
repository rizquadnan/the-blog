export type TUser = {
  id: number;
  name: string;
  email: string;
  gender: "male" | "female";
  status: "active" | "inactive";
};

export type TCreateUserPayload = Omit<TUser, "id">;
export type TUpdateUserPayload = Partial<TCreateUserPayload>;
