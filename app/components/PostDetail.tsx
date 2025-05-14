import { formatCountNumber } from "../scripts/count";
import "./PostDetail.css";

interface PostDetailProps {
  writerNickname: string;
  writeTime: string;
  title: string;
  tagList: string;
  description: string;
  writerId: string;
  chat: number;
  like: number;
  bookmark: number;
  cancelOnclick: () => void;
}

export default function PostDetailComponent(Details: PostDetailProps) {
  return (
    <>
      <div className="post-detail-frame">
        <div className="post-detail-map"></div>
        <div className="post-detail-show-detail">
          <div className="post-detail-writer">
            <div className="post-detail-profile-pic"></div>
            <div className="post-detail-text">
              <div className="post-detail-author">{Details.writerNickname}</div>
              <div className="post-detail-id-with-time">
                <div className="post-detail-id">{Details.writerId}</div>
                <div className="post-detail-time">{Details.writeTime}</div>
              </div>
            </div>
          </div>
          <div className="post-detail-show-count">
            <div className="post-detail-chats">
              <img className="post-detail-chat" src=".\app\assets\chat.svg" />
              <div className="post-detail-chat-count">
                {formatCountNumber(Details.chat)}
              </div>
            </div>
            <div className="post-detail-likes">
              <img className="post-detail-heart" src=".\app\assets\heart.svg" />
              <div className="post-detail-like-count">
                {formatCountNumber(Details.like)}
              </div>
            </div>
            <div className="post-detail-bookmarks">
              <img
                className="post-detail-book-open"
                src=".\app\assets\book-open.svg"
              />
              <div className="post-detail-bookmark-count">
                {formatCountNumber(Details.bookmark)}
              </div>
            </div>
          </div>
        </div>
        <div className="post-detail-show-text">
          <div className="post-detail-subject-detail">{Details.title}</div>
          <div className="post-detail-tag-list">{Details.tagList}</div>
          <div className="post-detail-description-all">
            {Details.description}
          </div>
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
          <button
            className="post-detail-cancel"
            onClick={Details.cancelOnclick}
          >
            돌아가기
          </button>
        </div>
      </div>
    </>
  );
}
