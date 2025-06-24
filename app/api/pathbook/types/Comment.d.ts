export interface CommentAuthor {
  id: string;
  username: string;
  icon_url: string | null;
}

export interface Comment {
  commentId: number;
  author: CommentAuthor;
  content: string;
  likeCount: number;
  createdAt: string;
  childComments: Comment[];
}