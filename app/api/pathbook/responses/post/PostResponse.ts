export interface GetPostListResponse {
  id: number;
  authorId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostLikeResponse {
  userId: string;
  username: string;
  createdAt: string;
}

export interface PostResponse {
  id: number;
  authorId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: PostLikeResponse[];
}