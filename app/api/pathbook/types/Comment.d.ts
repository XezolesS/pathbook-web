import { User } from "./User";

export type Comment = {
  commentId: number;
  postId: number;
  author: User;
  content: stirng;
  createdAt: number;
  updatedAt: number | null;
  likeCount: number;
  childComments: Comment[];
};
