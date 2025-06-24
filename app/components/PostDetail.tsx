import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PostDetailRequest from "../api/pathbook/requests/post/GetPostDetailRequest";
import type { Post } from "../api/pathbook/types/Post";
import Comments from "./Comments";
import { formatCountNumber } from "../scripts/count";
import "./PostDetail.css";

export default function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentValue, setCommentValue] = useState("");
  const [isCommentActive, setCommentActive] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const initialHeight = useRef<string | null>(null);

  useEffect(() => {
    if (!postId) {    
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const data = await new PostDetailRequest(+postId).send();
        setPost(data);
      } catch (e) {
        console.error("상세 로드 실패:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  const countAll = (c: Post["rootComments"][number]): number =>
    1 + c.childComments.reduce((s, ch) => s + countAll(ch), 0);
  const resetHeight = () => {
    if (inputRef.current) inputRef.current.style.height = initialHeight.current || "auto";
  };

  if (loading) return <div className="post-detail-frame">로딩 중…</div>;
  if (!post)    return <div className="post-detail-frame">게시글을 찾을 수 없습니다.</div>;

  const rootComments = post.rootComments ?? [];
  const commentCount = rootComments.reduce((s, c) => s + countAll(c), 0);
  const thumb =
    post.pathThumbnailUrl?.trim() ||
    (post.attachments.length ? post.attachments[0] : null);

  const handleSubmitComment = () => {
    if (!commentValue.trim()) return;
    /* TODO: POST /post/{id}/comment */
    setCommentValue("");
    setCommentActive(false);
    resetHeight();
  };

  return (
    <div className="post-detail-frame">
      <div className="post-detail-item">
        {thumb && (
          <div className="post-detail-map" style={{ backgroundImage: `url(${thumb})` }} />
        )}

        <header className="post-detail-writer">
          <div className="post-detail-profile-pic" />
          <div className="post-detail-text">
            <div className="post-detail-author">{post.author.username}</div>
            <div className="post-detail-id-with-time">
              <div className="post-detail-id">{post.author.id}</div>
              <div className="post-detail-time">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </header>

        <div className="post-detail-show-count">
          <div className="post-detail-chats">
            <img className="post-detail-chat" src="../app/assets/chat.svg" />
            <div className="post-detail-chat-count">
              {formatCountNumber(commentCount)}
            </div>
          </div>
          <div className="post-detail-likes">
            <img className="post-detail-heart" src="../app/assets/heart.svg" />
            <div className="post-detail-like-count">
              {formatCountNumber(post.likeCount)}
            </div>
          </div>
          <div className="post-detail-bookmarks">
            <img className="post-detail-book-open" src="../app/assets/book-open.svg" />
            <div className="post-detail-bookmark-count">
              {formatCountNumber(post.bookmarkCount)}
            </div>
          </div>
        </div>

        <h2 className="post-detail-subject-detail">{post.title}</h2>
        <p className="post-detail-tag-list">{post.tags.join(" ")}</p>
        <div
          className="post-detail-description-all"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <section className="post-detail-comment-container">
          <div className="post-detail-comment-textarea">
            <div className="post-detail-profile-pic" />
            <textarea
              ref={inputRef}
              className="post-detail-comment-input"
              placeholder="댓글을 입력하세요."
              value={commentValue}
              rows={1}
              onFocus={() => setCommentActive(true)}
              onChange={(e) => setCommentValue(e.target.value)}
            />
          </div>

          {isCommentActive && (
            <div className="post-detail-comment-buttons">
              <button onClick={() => { setCommentValue(""); setCommentActive(false); resetHeight(); }}>
                취소
              </button>
              <button onClick={handleSubmitComment}>작성</button>
            </div>
          )}
        </section>

        {/* 댓글 목록 */}
        <Comments comments={rootComments} />

        {/* 액션 버튼 */}
        <footer className="post-detail-button-container">
          <button onClick={() => navigate(-1)}>돌아가기</button>
          <button onClick={() => navigate("/post/write", { state: { post } })}>
            글 수정
          </button>
          {/* 삭제는 TODO: 사용자 권한 확인 후 구현 */}
        </footer>
      </div>
    </div>
  );
}
