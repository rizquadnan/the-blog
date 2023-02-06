export type TPost = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type TCreatePostPayload = Omit<TPost, "id">;
export type TUpdatePostPayload = Partial<Omit<TCreatePostPayload, "user_id">>;
