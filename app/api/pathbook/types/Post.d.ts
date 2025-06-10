import { User } from "./User";
import { Comment } from "./Comment";

export type Post = {
  postId: number;
  author: User;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  pathId: number;
  attachments: string[];
  rootComments: Comment[];
  likeCount: number;
  bookmarkCount: number;
  tags: string[];
};
