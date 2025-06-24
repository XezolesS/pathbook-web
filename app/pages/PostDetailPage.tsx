import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Post } from "../api/pathbook/types/Post";
import GetPostDetailRequest from "../api/pathbook/requests/post/GetPostDetailRequest";
import PostDetail from "../components/PostDetail";          // ← 컴포넌트 경로 주의
import "./Main.css";

/* 백엔드 DTO → 프런트 Post 인터페이스 맞추기 */
function mapToPost(dto: any): Post {
  return {
    ...dto,
    pathThumbnailUrl: dto.path?.thumbnail
      ? `/file/${dto.path.thumbnail.filename}`
      : undefined,
    attachments: (dto.attachments ?? []).map((f: any) => `/file/${f.filename}`),
    rootComments: dto.comments ?? [],
    tags: dto.tags ?? [],
  };
}

export default function PostDetailPage() {
  /* Route 세그먼트 이름이 :postid 이든 :id 이든 자동 대응 */
  const { postid, id } = useParams();
  const postId = (postid ?? id) as string | undefined;
  const navigate = useNavigate();

  const [post, setPost]    = useState<Post | null>(null);
  const [loading, setLoad] = useState(true);

  /* ---- 실데이터 로드 ---- */
  useEffect(() => {
    if (!postId) { setLoad(false); return; }

    (async () => {
      try {
        const dto  = await new GetPostDetailRequest(postId).send();
        setPost(mapToPost(dto));
      } catch (err) {
        console.error("상세 로드 실패:", err);
      } finally {
        setLoad(false);
      }
    })();
  }, [postId]);

  if (loading) return <div className="post-detail-frame">로딩 중…</div>;
  if (!post)   return <div className="post-detail-frame">게시글이 없습니다.</div>;

  return (
    <div className="article-detail-contents">
      <PostDetail post={post} />
      <div className="post-detail-control">
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        <button onClick={() => navigate("/post/write", { state: { post } })}>
          수정
        </button>
      </div>
    </div>
  );
}
