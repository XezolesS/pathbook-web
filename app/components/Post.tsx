import { useEffect, useState } from "react";
import { Comment } from "../api/pathbook/types/Comment";
import { Post } from "../api/pathbook/types/Post";
import { Author } from "../api/pathbook/types/Author";
import { formatCountNumber } from "../scripts/count";
import "./Post.css";
import pathData from "../mock/Path.json";

export default function PostComponent({ post }: { post: Post }) {
  const [postId, setPostId] = useState<number | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [commentCount, setCommentCount] = useState<number | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [bookmarkCount, setBookmarkCount] = useState<number | null>(null);
  const [tags, setTags] = useState<string | null>(null);
  const [showImage, setShowImage] = useState(false);

  const isLoader = post.title == null && post.content == null;

  const pathInfo =
    post.id != null
      ? pathData.find((p) => p.pathId === post.id) // TODO: Path 백엔드 연동
      : null;

  const pathThumb =
    pathInfo && pathInfo.pathThumbnailUrl?.trim() !== ""
      ? pathInfo.pathThumbnailUrl
      : null;

  const hasPathThumb = !!pathThumb;
  const hasAttach = !!(post.attachments && post.attachments.length > 0);
  const firstAttach = hasAttach ? post.attachments![0] : null;
  const attachCount = post.attachments?.length ?? 0;
  const hasMultiAtt = attachCount > 1;
  const hasImageCandidate = hasPathThumb || hasAttach;
  let imgDOM: React.ReactNode = null;
  if (!isLoader && showImage) {
    if (hasPathThumb && hasAttach) {
      imgDOM = (
        <>
          <img src={pathThumb!} className="post-img-main" draggable={false} />
          <div className="img-wrapper" style={{ flex: "1 0 0" }}>
            <img
              src={firstAttach!}
              className="post-img-sub"
              draggable={false}
            />
            {hasMultiAtt && (
              <div className="img-overlay">+{attachCount - 1}</div>
            )}
          </div>
        </>
      );
    } else if (hasPathThumb) {
      imgDOM = (
        <img src={pathThumb!} className="post-img-single" draggable={false} />
      );
    } else if (hasAttach) {
      imgDOM = (
        <img src={firstAttach!} className="post-img-single" draggable={false} />
      );
    }
  }

  const delay = async (ms: number) =>
    await new Promise((resolve) => setTimeout(resolve, ms));

  // 임시 로딩
  useEffect(() => {
    const run = async () => {
      await delay(500); // Properly awaited

      setShowImage(true);

      const dateString = new Date(post.createdAt).toLocaleString();

      function countTotalComments(comment: Comment): number {
        let total = 1;

        if (comment.childComments) {
          for (const child of comment.childComments) {
            total += countTotalComments(child);
          }
        }

        return total;
      }

      const rootComments = post.rootComments ?? [];
      let totalCommentCount = 0;
      for (const rootComment of rootComments) {
        totalCommentCount += countTotalComments(rootComment);
      }

      setPostId(post.id);
      setAuthor(post.author);
      setTitle(post.title);
      setContent(post.content);
      setCreatedAt(dateString);
      setCommentCount(totalCommentCount);
      setLikeCount(post.likeCount);
      setBookmarkCount(post.bookmarkCount);
      setTags(post.tags.join(" "));
    };

    run();
  }, []);

  return (
    <>
      <div className="post-container">
        <div className="post-item">
          <div className="post-contents-text-container">
            <div
              className="post-contents-title"
              style={getBackgroundStyle(title, "#a2a2a2", "50%")}
            >
              {title}
            </div>
            <div
              className="post-contents-description"
              style={getBackgroundStyle(title, "#e2e2e2", "30%")}
            >
              {content}
            </div>
            <div
              className="post-contents-taglist"
              style={getBackgroundStyle(title, "#e2e2e2", "20%")}
            >
              {tags}
            </div>
          </div>

          <div
            className={`post-contents-img-container ${
              isLoader ? "loading-placeholder" : ""
            }`}
            style={!hasImageCandidate ? { display: "none" } : undefined}
          >
            {!showImage && <div className="post-image-loader" />}
            {imgDOM}
          </div>

          <div className="post-contents-info">
            <div className="post-contents-writer">
              <div className="post-contents-profile-pic"></div>
              <div className="post-contents-profile-text">
                <div
                  className="post-contents-author"
                  style={getBackgroundStyle(title, "#a2a2a2", "3rem")}
                >
                  {author?.username}
                </div>
                <div
                  className="post-contents-id"
                  style={getBackgroundStyle(title, "#e2e2e2", "5rem")}
                >
                  {postId} · {createdAt}
                </div>
              </div>
            </div>
            <div className="post-contents-show-count">
              <div
                className="chats"
                style={getBackgroundStyle(title, "#a2a2a2", "5%")}
              >
                <img
                  className="chat"
                  src=".\app\assets\chat.svg"
                  style={getSvgWidthStyle(title)}
                />
                <div className="chat-count" hidden={commentCount === null}>
                  {formatCountNumber(commentCount)}
                </div>
              </div>
              <div
                className="likes"
                style={getBackgroundStyle(title, "#e2e2e2", "5%")}
              >
                <img
                  className="heart"
                  src=".\app\assets\heart.svg"
                  style={getSvgWidthStyle(title)}
                />
                <div className="like-count" hidden={likeCount === null}>
                  {formatCountNumber(likeCount)}
                </div>
              </div>
              <div
                className="bookmarks"
                style={getBackgroundStyle(title, "#e2e2e2", "5%")}
              >
                <img
                  className="book-open"
                  src=".\app\assets\book-open.svg"
                  style={getSvgWidthStyle(title)}
                />
                <div className="bookmark-count" hidden={bookmarkCount === null}>
                  {formatCountNumber(bookmarkCount)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function getBackgroundStyle(value: any, fallbackColor: string, width: string) {
  const isNullish = value === null || value === undefined;

  return isNullish
    ? {
        backgroundColor: fallbackColor,
        width: width,
        color: "transparent",
      }
    : undefined;
}

function getSvgWidthStyle(value: any) {
  const isNullish = value === null || value === undefined;

  return isNullish ? { width: 0 } : undefined;
}
