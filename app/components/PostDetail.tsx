/* ───────── components/PostDetail.tsx (SCRIPT 영역 포함 전체 코드) ───────── */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import type { Post } from "../api/pathbook/types/Post";
import type { Comment } from "../api/pathbook/types/Comment";
import { APIConfig } from "../api/pathbook/APIConfig";
import { formatCountNumber } from "../scripts/count";
import Comments from "./Comments";
import "./PostDetail.css";

export default function PostDetailComponent({ post }: { post: Post }) {
  /* ---------- 네비게이션 ---------- */
  const navigate = useNavigate();
  const handleEditPost   = () => navigate("/post/write", { state: { post } });
  const handleDeletePost = () => {/* TODO */};
  const handleGoBack     = () => navigate(-1);

  /* ---------- 썸네일 ---------- */
  const pathThumb =
    post.pathThumbnailUrl?.trim()
      ? post.pathThumbnailUrl
      : post.attachments[0] ?? null;

  /* ---------- 상태 ---------- */
  const [author,        setAuthor]        = useState<any>(null);   // any → userId 대응
  const [title,         setTitle]         = useState<string | null>(null);
  const [content,       setContent]       = useState<string | null>(null);
  const [createdAt,     setCreatedAt]     = useState<string | null>(null);
  const [rootComments,  setRootComments]  = useState<Comment[]>(post.rootComments);
  const [commentCount,  setCommentCount]  = useState<number | null>(null);
  const [likeCount,     setLikeCount]     = useState<number | null>(null);
  const [bookmarkCount, setBookmarkCount] = useState<number | null>(null);
  const [tags,          setTags]          = useState<string | null>(null);

  /* ---------- 댓글 입력 ---------- */
  const [commentValue,   setCommentValue]  = useState("");
  const [isCommentActive,setCommentActive] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const initHeight = useRef<string | null>(null);

  const resetHeight = () => {
    if (inputRef.current) inputRef.current.style.height = initHeight.current || "auto";
  };

  const handleCancelComment = () => {
    setCommentValue("");
    setCommentActive(false);
    resetHeight();
  };

  const handleSubmitComment = async () => {
  const text = commentValue.trim();
  if (!text) return;

  try {
    const res = await fetch(`${APIConfig.API_HOST}/post/comment/write`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ postId: post.id, content: text })
    });

    if (!res.ok) throw await res.text();

    const newComment: Comment = await res.json();

    /* ✨ childComments 가 없으면 빈 배열로 만들어 줌 */
    if (!Array.isArray(newComment.childComments))
      newComment.childComments = [];

    setRootComments(prev => [...prev, newComment]);
    setCommentCount(prev => (prev ?? 0) + 1);

    setCommentValue("");
    setCommentActive(false);
    resetHeight();
  } catch (e) {
    console.error("댓글 작성 실패:", e);
    alert("댓글 작성에 실패했습니다.");
  }
};



  /* ---------- 댓글 수 계산 ---------- */
  const total = (c: Comment): number =>
    1 + c.childComments.reduce((s, ch) => s + total(ch), 0);

  /* ---------- 초기 데이터 세팅 ---------- */
  useEffect(() => {
    setAuthor({ ...post.author, userId: post.author.id }); // userId 필드 대응
    setTitle(post.title);
    setContent(post.content);
    setCreatedAt(new Date(post.createdAt).toLocaleString());
    setRootComments(post.rootComments);
    setCommentCount(post.rootComments.reduce((s, c) => s + total(c), 0));
    setLikeCount(post.likeCount);
    setBookmarkCount(post.bookmarkCount);
    setTags(post.tags.join(" "));
  }, [post]);

/* ----------------------- ↓ HTML 영역 (수정 금지) ↓ ----------------------- */
  return (
    <>
      <div className="post-detail-frame">
        <div className="post-detail-item">
          <div
            className="post-detail-map"
            style={{ backgroundImage: `url(.${pathThumb})` }}
          >
            <img src={pathThumb}></img>
          </div>

          <div className="post-detail-show-detail">
            <div className="post-detail-writer">
              <div className="post-detail-profile-pic"></div>
              <div className="post-detail-text">
                <div className="post-detail-author">{author?.username}</div>
                <div className="post-detail-id-with-time">
                  <div className="post-detail-id">{author?.id}</div>
                  <div className="post-detail-time">{createdAt}</div>
                </div>
              </div>
            </div>

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
                  {formatCountNumber(likeCount)}
                </div>
              </div>
              <div className="post-detail-bookmarks">
                <img className="post-detail-book-open" src="../app/assets/book-open.svg" />
                <div className="post-detail-bookmark-count">
                  {formatCountNumber(bookmarkCount)}
                </div>
              </div>
            </div>
          </div>

          <div className="post-detail-show-text">
            <div className="post-detail-subject-detail">{title}</div>
            <div className="post-detail-tag-list">{tags}</div>
            <div
              className="post-detail-description-all"
              dangerouslySetInnerHTML={{ __html: content ?? "" }}
            ></div>
          </div>

          <div className="post-detail-comment-desc">
            <img className="post-detail-chat" src="../app/assets/chat.svg" />
            <div className="post-detail-comment-explain">댓글</div>
          </div>

          <div className="post-detail-comment-container">
            <div className="post-detail-comment-textarea">
              <div className="post-detail-profile-pic"></div>

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
                <button className="comment-btn-cancel" onClick={handleCancelComment}>
                  취소
                </button>
                <button className="comment-btn-submit" onClick={handleSubmitComment}>
                  작성
                </button>
              </div>
            )}
          </div>

          <div className="post-detail-comments-container">
            <Comments comments={rootComments} />
          </div>

          <div className="post-detail-button-container">
            <button className="post-detail-delete" onClick={handleDeletePost}>
              글 삭제
            </button>
            <button className="post-detail-edit" onClick={handleEditPost}>
              글 수정
            </button>
            <button className="post-detail-cancel" onClick={handleGoBack}>
              돌아가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
/* ───────── End of PostDetail.tsx ───────── */
