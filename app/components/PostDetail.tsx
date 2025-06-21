import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Post } from "../api/pathbook/types/Post";
import { User } from "../api/pathbook/types/User";
import { formatCountNumber } from "../scripts/count";
import "./PostDetail.css";
import Comments from "./Comments";
import pathData from "../mock/Path.json";

export default function PostDetailComponent({ post }: { post: Post }) {
  const navigate = useNavigate();

  const handleEditPost = () => {
    navigate("/post/write", { state: { post } });
  };

  const handleDeletePost = () => {
    // TODO: DELETE
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const pathInfo =
    post.pathId != null
      ? pathData.find((p) => p.pathId === post.pathId)  // TODO: Path 백엔드 연동
      : null;

  const pathThumb =
    pathInfo && pathInfo.pathThumbnailUrl?.trim() !== ""
      ? pathInfo.pathThumbnailUrl
      : null;

  const [postId, setPostId] = useState<number | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [commentCount, setCommentCount] = useState<number | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [bookmarkCount, setBookmarkCount] = useState<number | null>(null);
  const [tags, setTags] = useState<string | null>(null);

  const [commentValue, setCommentValue] = useState("");
  const [isCommentActive, setCommentActive] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const initialHeight = useRef<string | null>(null);

  const handleResizeReset = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = initialHeight.current || "auto";
    }
  };

  const handleCancelComment = () => {
    setCommentValue("");
    setCommentActive(false);
    inputRef.current?.blur();
    handleResizeReset();
  };
  const handleSubmitComment = () => {
    if (!commentValue.trim()) return;
    /* TODO: 댓글 전송 로직 */
    setCommentValue("");
    setCommentActive(false);
    handleResizeReset();
  };

  const countAllComments = (root: Post["rootComments"][number]): number =>
    1 + root.childComments.reduce((acc, c) => acc + countAllComments(c), 0);
  
  useEffect(() => {
    setAuthor(post.author);
    setTitle(post.title);
    setContent(post.content);
    setCreatedAt(new Date(post.createdAt).toLocaleString());
    setCommentCount(post.rootComments.reduce((acc, c) => acc + countAllComments(c), 0));
    setLikeCount(post.likeCount);
    setBookmarkCount(post.bookmarkCount);
    setTags(post.tags.join(" "));
  }, [post]);

  return (
    <>
      <div className="post-detail-frame">
        <div className="post-detail-item">
          <div className="post-detail-map" style={{backgroundImage:`url(.${pathThumb})`}}></div>
          <div className="post-detail-show-detail">
            <div className="post-detail-writer">
              <div className="post-detail-profile-pic"></div>
              <div className="post-detail-text">
                <div className="post-detail-author">{author?.username}</div>
                <div className="post-detail-id-with-time">
                  <div className="post-detail-id">{author?.userId}</div>
                  <div className="post-detail-time">{createdAt}</div>
                </div>
              </div>
            </div>
            <div className="post-detail-show-count">
              <div className="post-detail-chats">
                <img className="post-detail-chat" src="..\app\assets\chat.svg" />
                <div className="post-detail-chat-count">
                  {formatCountNumber(commentCount)}
                </div>
              </div>
              <div className="post-detail-likes">
                <img className="post-detail-heart" src="..\app\assets\heart.svg" />
                <div className="post-detail-like-count">
                  {formatCountNumber(likeCount)}
                </div>
              </div>
              <div className="post-detail-bookmarks">
                <img
                  className="post-detail-book-open"
                  src="..\app\assets\book-open.svg"
                />
                <div className="post-detail-bookmark-count">
                  {formatCountNumber(bookmarkCount)}
                </div>
              </div>
            </div>
          </div>
          <div className="post-detail-show-text">
            <div className="post-detail-subject-detail">{title}</div>
            <div className="post-detail-tag-list">{tags}</div>
            <div className="post-detail-description-all">{content}</div>
          </div>

          <div className="post-detail-comment-desc">
            <img className="post-detail-chat" src="..\app\assets\chat.svg" />
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
                <button
                  className="comment-btn-cancel"
                  onClick={handleCancelComment}
                >
                  취소
                </button>

                <button
                  className="comment-btn-submit"
                  onClick={handleSubmitComment}
                >
                  작성
                </button>
              </div>
            )}
          </div>
          
          <div className="post-detail-comments-container">
            <Comments comments={post.rootComments} />
          </div>

          <div className="post-detail-button-container">
            {/* 글 삭제, 수정은 유저 정보를 확인 후 로드 할 것. */}
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
