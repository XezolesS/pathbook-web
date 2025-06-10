import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Comment } from "../api/pathbook/types/Comment";
import { Post } from "../api/pathbook/types/Post";
import { User } from "../api/pathbook/types/User";
import { formatCountNumber } from "../scripts/count";
import "./PostDetail.css";

export default function PostDetailComponent({ post }: { post: Post }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back one entry in the history stack
  };

  const [postId, setPostId] = useState<number | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [commentCount, setCommentCount] = useState<number | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [bookmarkCount, setBookmarkCount] = useState<number | null>(null);
  const [tags, setTags] = useState<string | null>(null);

  useEffect(() => {
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

    let totalCommentCount = 0;
    for (const rootComment of post.rootComments) {
      totalCommentCount += countTotalComments(rootComment);
    }

    setPostId(post.postId);
    setAuthor(post.author);
    setTitle(post.title);
    setContent(post.content);
    setCreatedAt(dateString);
    setCommentCount(totalCommentCount);
    setLikeCount(post.likeCount);
    setBookmarkCount(post.bookmarkCount);
    setTags(post.tags.join(" "));
  }, []);

  return (
    <>
      <div className="post-detail-frame">
        <div className="post-detail-map"></div>
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
              <img className="post-detail-chat" src=".\app\assets\chat.svg" />
              <div className="post-detail-chat-count">
                {formatCountNumber(commentCount)}
              </div>
            </div>
            <div className="post-detail-likes">
              <img className="post-detail-heart" src=".\app\assets\heart.svg" />
              <div className="post-detail-like-count">
                {formatCountNumber(likeCount)}
              </div>
            </div>
            <div className="post-detail-bookmarks">
              <img
                className="post-detail-book-open"
                src=".\app\assets\book-open.svg"
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
          <img className="post-detail-chat" src=".\app\assets\chat.svg" />
          <div className="post-detail-comment-explain">댓글</div>
        </div>

        <div className="post-detail-comment-container">
          <div className="post-detail-comment-textarea">
            <div className="post-detail-profile-pic"></div>
            <input
              className="post-detail-comment-input"
              type="text"
              placeholder="댓글을 입력하세요."
            />
            <button className="post-detail-comment-push">작성하기</button>
          </div>
          <div className="post-detail-comment-list">
            <div className="post-detail-comment-item">
              <div className="post-detail-writer">
                <div className="post-detail-profile-pic"></div>
                <div className="post-detail-space">
                  <div className="post-detail-comment-info">
                    <div className="post-detail-id-with-time">
                      <div className="post-detail-cm-id">@user_id</div>
                      <div className="post-detail-time">
                        2025/01/23 12:34 PM
                      </div>
                    </div>
                  </div>
                  <div className="post-detail-text">
                    댓글달아요. 가끔은 이런 긴 댓글도 달 수 있잖아요? 그럴 때
                    칸과 박스가 어떻게 변하는지, 글씨가 넘치지는 않는지 확인할
                    필요가 있잖아요?{" "}
                  </div>
                  <div className="post-detail-interaction-container">
                    <div className="post-detail-comment-likes">
                      <img
                        className="post-detail-heart"
                        src=".\app\assets\heart.svg"
                      />
                      <div className="post-detail-cm-like-count">
                        {formatCountNumber(45)}
                      </div>
                    </div>
                    <div className="post-detail-comment-reply">
                      <img
                        className="post-detail-chat"
                        src=".\app\assets\chat.svg"
                      />
                      <div className="post-detail-cm-reply-count">
                        {formatCountNumber(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-detail-reply-item">
              <div className="post-detail-writer">
                <div className="post-detail-profile-pic"></div>
                <div className="post-detail-space">
                  <div className="post-detail-comment-info">
                    <div className="post-detail-id-with-time">
                      <div className="post-detail-cm-id">@user_id</div>
                      <div className="post-detail-time">
                        2025/01/23 12:34 PM
                      </div>
                    </div>
                  </div>
                  <div className="post-detail-text">
                    답글달아요 근데 댓글이 길지 않으면?
                  </div>
                  <div className="post-detail-interaction-container">
                    <div className="post-detail-comment-likes">
                      <img
                        className="post-detail-heart"
                        src=".\app\assets\heart.svg"
                      />
                      <div className="post-detail-cm-like-count">
                        {formatCountNumber(5)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-detail-comment-item">
              <div className="post-detail-writer">
                <div className="post-detail-profile-pic"></div>
                <div className="post-detail-space">
                  <div className="post-detail-comment-info">
                    <div className="post-detail-id-with-time">
                      <div className="post-detail-cm-id">@user_id</div>
                      <div className="post-detail-time">
                        2025/01/23 12:34 PM
                      </div>
                    </div>
                  </div>
                  <div className="post-detail-text">댓글달아요</div>
                  <div className="post-detail-interaction-container">
                    <div className="post-detail-comment-likes">
                      <img
                        className="post-detail-heart"
                        src=".\app\assets\heart.svg"
                      />
                      <div className="post-detail-cm-like-count">
                        {formatCountNumber(1)}
                      </div>
                    </div>
                    <div className="post-detail-comment-reply">
                      <img
                        className="post-detail-chat"
                        src=".\app\assets\chat.svg"
                      />
                      <div className="post-detail-cm-reply-count">
                        {formatCountNumber()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="post-detail-button-container">
          <button className="post-detail-cancel" onClick={handleGoBack}>
            돌아가기
          </button>
        </div>
      </div>
    </>
  );
}
