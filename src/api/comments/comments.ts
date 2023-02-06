export type TComment = {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
};

export type TCreateCommentPayload = {
  name: string;
  email: string;
  body: string;
};
