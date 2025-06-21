import React, { useState, ReactNode, CSSProperties } from "react";
import "./Comments.css";
import { formatCountNumber } from "../scripts/count";
import { Comment } from "../api/pathbook/types/Comment";

const BATCH = 3;
const REMOVE_LEVELS = 3;

const initial = (n: string) => n.slice(0, 1).toUpperCase();
const fmtDate  = (t: number | string) => new Date(t).toLocaleString();
const countDesc = (c: Comment): number => c.childComments.reduce((s, ch) => s + 1 + countDesc(ch), 0);

interface CollapseInfo {
  anchorId: number;
  depth: number;
  focus: Comment;
  basePath: Comment[];
  prev: CollapseInfo | null;
}

const isAnchor = (info: CollapseInfo | null, path: Comment[]) =>
  !!info &&
  path.length === info.depth + 1 &&
  path[path.length - 1].commentId === info.anchorId;

export default function Comments({ comments }: { comments: Comment[] }): React.ReactElement {
  const [collapse, setCollapse] = useState<CollapseInfo | null>(null);

  const renderList = (items: Comment[], path: Comment[]): ReactNode =>
    items.map((c, idx) => {
      const curPath = [...path, c];
      const onlyChild = items.length === 1;
      const isLast = idx === items.length - 1;

      if (isAnchor(collapse, curPath)) {
        return (
          <CollapsedSubtree
            key={`col-${collapse!.anchorId}`}
            anchorDepth={collapse!.depth}
            focusComment={collapse!.focus}
            basePath={collapse!.basePath}
            isLast={isLast}
            onClose={() => setCollapse(collapse!.prev)}
            setCollapse={setCollapse}
          />
        );
      }

      return (
        <CommentItem
          key={c.commentId}
          comment={c}
          depth={path.length}
          path={curPath}
          isLast={isLast}
          onlyChild={onlyChild}
          onMore={(itemDepth, fullPath) =>
            setCollapse(prev => {
              const anchorDepth = itemDepth - (REMOVE_LEVELS - 1);
              return {
                anchorId: fullPath[anchorDepth].commentId,
                depth: anchorDepth,
                focus: fullPath[fullPath.length - 1],
                basePath: fullPath.slice(0, anchorDepth + 1),
                prev,
              };
            })
          }
          renderChildren={renderList}
        />
      );
    });

  return <ul className="comment-list depth-0">{renderList(comments, [])}</ul>;
}

interface ColProps {
  anchorDepth: number;
  focusComment: Comment;
  basePath: Comment[];
  isLast: boolean;
  onClose: () => void;
  setCollapse: React.Dispatch<React.SetStateAction<CollapseInfo | null>>;
}

const CollapsedSubtree: React.FC<ColProps> = ({
  anchorDepth,
  focusComment,
  basePath,
  isLast,
  onClose,
  setCollapse,
}) => {
  const renderChildren = (list: Comment[], path: Comment[], depth: number): ReactNode =>
    list.map((c, idx) => {
      const curPath = [...path, c];
      const onlyChild = list.length === 1;
      const isLastItem = idx === list.length - 1;

      return (
        <CommentItem
          key={c.commentId}
          comment={c}
          depth={depth}
          path={curPath}
          isLast={isLastItem}
          onlyChild={onlyChild}
          onMore={(itemDepth, fullPath) =>
            setCollapse(prev => {
              const anchorDepthNext = itemDepth - (REMOVE_LEVELS - 1);
              return {
                anchorId: fullPath[anchorDepthNext].commentId,
                depth: anchorDepthNext,
                focus: fullPath[fullPath.length - 1],
                basePath: fullPath.slice(0, anchorDepthNext + 1),
                prev,
              };
            })
          }
          renderChildren={(gr, gp) => renderChildren(gr, gp, depth + 1)}
        />
      );
    });

  const liClass = [
    "comment-item",
    `depth-${anchorDepth}`,
    isLast ? "is-last no-rail" : "",
  ].filter(Boolean).join(" ");

  return (
    <li className={liClass}>
      <div className="comment comment-more" onClick={onClose}>
        <div className="avatar more-avatar">＋</div>
        <span className="more-label">이전 댓글 보기</span>
      </div>

      <ul className={`comment-list depth-${anchorDepth + 1}`}>
        {renderChildren(
          focusComment.childComments,
          [...basePath, focusComment],
          anchorDepth + 1
        )}
      </ul>
    </li>
  );
};

interface ItemProps {
  comment: Comment;
  depth: number;
  path: Comment[];
  isLast: boolean;
  onlyChild?: boolean;
  onMore: (depth: number, fullPath: Comment[]) => void;
  renderChildren: (it: Comment[], p: Comment[]) => ReactNode;
}

const CommentItem: React.FC<ItemProps> = ({
  comment,
  depth,
  path,
  isLast,
  onlyChild = false,
  onMore,
  renderChildren,
}) => {
  const hasChildren = comment.childComments.length > 0;
  const nextDepth = depth + 1;

  const showMore =
    depth !== 0 &&
    depth % REMOVE_LEVELS === 0 &&
    countDesc(comment) > BATCH;

  const displayCnt = Math.min(BATCH, countDesc(comment));

   const avatarStyle: CSSProperties | undefined = comment.author.icon_url
    ? {
        backgroundImage: `url(${comment.author.icon_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <li
      className={[
        "comment-item",
        `depth-${depth}`,
        hasChildren ? "with-children" : "",
        isLast ? "is-last" : "",
        onlyChild ? "no-rail" : "",
      ].join(" ")}
    >
      <div className={`comment ${hasChildren ? "has-children" : ""}`}>
        <div className="avatar">
          <span style={avatarStyle}>
            {comment.author.icon_url ? "" : initial(comment.author.username)}
          </span>
        </div>
        <div className="comment-box">
          <div className="comment-body">
            <p className="comment-author">
              {comment.author.username}
              <span className="comment-date"> · {fmtDate(comment.createdAt)}</span>
            </p>
            <p className="comment-content">{comment.content}</p>
          </div>
          <div className="comment-actions">
            <img className="comment-detail-heart" src="../app/assets/heart.svg" />
            <div className="post-detail-cm-like-count">{formatCountNumber(comment.likeCount)}</div>
            <img className="comment-detail-chat" src="../app/assets/chat.svg" />
            <div className="post-detail-cm-reply-count">{formatCountNumber(comment.childComments.length)}</div>
          </div>
        </div>
      </div>

      {hasChildren && (
        <ul className={`comment-list depth-${nextDepth}`}>
          {showMore ? (
            <li
              className={`comment-item depth-${nextDepth} comment-more no-rail`}
              onClick={() => onMore(depth, path)}
            >
              <div className="comment">
                <div className="avatar more-avatar">＋</div>
                <span className="more-label">댓글 더보기</span>
              </div>
            </li>
          ) : (
            renderChildren(comment.childComments, path)
          )}
        </ul>
      )}
    </li>
  );
};
