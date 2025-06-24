import { Author } from "./Author";
import type { Comment } from "./Comment";
import type { File } from "./File";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: Author;
  view: number;
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;


  path?: {
    pathPoints: [
      {
        latitude: number;
        longitude: number;
      }
    ];
    thumbnail: File;
  }; // 지도 썸네일 (옵션)
  tags: string[]; // 예: ["#산책", "#봄나들이"]
  attachments: string[]; // 첨부 이미지 URL 배열
  comments: Comment[]; // 상세에서만 채워짐

  createdAt: string;
  updatedAt: string;
}
