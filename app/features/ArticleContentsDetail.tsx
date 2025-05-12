import "./ArticleContentsDetailStyle.css";
import { formatCountNumber } from '../scripts/count';

interface ArticleContentsDetailProps {
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

export default function ArticleContentsDetail(Details: ArticleContentsDetailProps) {
  return (
    <>
      <div className="article-contents-detail-frame">
        <div className="article-contents-detail-map"></div>
        <div className="article-contents-detail-show-detail">
          <div className="article-contents-detail-writer">
            <div className="article-contents-detail-profile-pic"></div>
            <div className="article-contents-detail-text">
              <div className="article-contents-detail-author">{Details.writerNickname}</div>
              <div className="article-contents-detail-id-with-time">
                <div className="article-contents-detail-id">{Details.writerId}</div>
                <div className="article-contents-detail-time">{Details.writeTime}</div>
              </div>
            </div>
          </div>
          <div className="article-contents-detail-show-count">
            <div className="article-contents-detail-chats">
              <img className="article-contents-detail-chat" src=".\app\features\assets\chat.svg" />
              <div className="article-contents-detail-chat-count">{formatCountNumber(Details.chat)}</div>
            </div>
            <div className="article-contents-detail-likes">
              <img className="article-contents-detail-heart" src=".\app\features\assets\heart.svg" />
              <div className="article-contents-detail-like-count">{formatCountNumber(Details.like)}</div>
            </div>
            <div className="article-contents-detail-bookmarks">
              <img className="article-contents-detail-book-open" src=".\app\features\assets\book-open.svg" />
              <div className="article-contents-detail-bookmark-count">{formatCountNumber(Details.bookmark)}</div>
            </div>
          </div>
        </div>
        <div className="article-contents-detail-show-text">
          <div className="article-contents-detail-subject-detail">{Details.title}</div>
          <div className="article-contents-detail-tag-list">{Details.tagList}</div>
          <div className="article-contents-detail-description-all">{Details.description}</div>
        </div>

        <div className="article-contents-detail-comment-desc">
          <img className="article-contents-detail-chat" src=".\app\features\assets\chat.svg" />
          <div className="article-contents-detail-comment-explain">댓글</div>
        </div>

        <div className="article-contents-detail-comment-container">
          <div className="article-contents-detail-comment-textarea">
            <div className="article-contents-detail-profile-pic"></div>
            <input className="article-contents-detail-comment-input" type="text" placeholder="댓글을 입력하세요." />
            <button className="article-contents-detail-comment-push">작성하기</button>
          </div>
          <div className="article-contents-detail-comment-list">
            <div className="article-contents-detail-comment-item">
              <div className="article-contents-detail-writer">
                <div className="article-contents-detail-profile-pic"></div>
                <div className="article-contents-detail-space">
                  <div className="article-contents-detail-comment-info">
                    <div className="article-contents-detail-id-with-time">
                      <div className="article-contents-detail-cm-id">@user_id</div>
                      <div className="article-contents-detail-time">2025/01/23 12:34 PM</div>
                    </div>
                  </div>
                  <div className="article-contents-detail-text">댓글달아요. 가끔은 이런 긴 댓글도 달 수 있잖아요? 그럴 때 칸과 박스가 어떻게 변하는지, 글씨가 넘치지는 않는지 확인할 필요가 있잖아요? </div>
                  <div className="article-contents-detail-interaction-container">
                    <div className="article-contents-detail-comment-likes">
                      <img className="article-contents-detail-heart" src=".\app\features\assets\heart.svg" />
                      <div className="article-contents-detail-cm-like-count">{formatCountNumber(45)}</div>
                    </div>
                    <div className="article-contents-detail-comment-reply">
                      <img className="article-contents-detail-chat" src=".\app\features\assets\chat.svg" />
                      <div className="article-contents-detail-cm-reply-count">{formatCountNumber(1)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="article-contents-detail-reply-item">
              <div className="article-contents-detail-writer">
                <div className="article-contents-detail-profile-pic"></div>
                <div className="article-contents-detail-space">
                  <div className="article-contents-detail-comment-info">
                    <div className="article-contents-detail-id-with-time">
                      <div className="article-contents-detail-cm-id">@user_id</div>
                      <div className="article-contents-detail-time">2025/01/23 12:34 PM</div>
                    </div>
                  </div>
                  <div className="article-contents-detail-text">답글달아요 근데 댓글이 길지 않으면?</div>
                  <div className="article-contents-detail-interaction-container">
                    <div className="article-contents-detail-comment-likes">
                      <img className="article-contents-detail-heart" src=".\app\features\assets\heart.svg" />
                      <div className="article-contents-detail-cm-like-count">{formatCountNumber(5)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="article-contents-detail-comment-item">
              <div className="article-contents-detail-writer">
                <div className="article-contents-detail-profile-pic"></div>
                <div className="article-contents-detail-space">
                  <div className="article-contents-detail-comment-info">
                    <div className="article-contents-detail-id-with-time">
                      <div className="article-contents-detail-cm-id">@user_id</div>
                      <div className="article-contents-detail-time">2025/01/23 12:34 PM</div>
                    </div>
                  </div>
                  <div className="article-contents-detail-text">댓글달아요</div>
                  <div className="article-contents-detail-interaction-container">
                    <div className="article-contents-detail-comment-likes">
                      <img className="article-contents-detail-heart" src=".\app\features\assets\heart.svg" />
                      <div className="article-contents-detail-cm-like-count">{formatCountNumber(1)}</div>
                    </div>
                    <div className="article-contents-detail-comment-reply">
                      <img className="article-contents-detail-chat" src=".\app\features\assets\chat.svg" />
                      <div className="article-contents-detail-cm-reply-count">{formatCountNumber()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="article-contents-detail-button-container">
          <button className="article-contents-detail-cancel" onClick={Details.cancelOnclick}>돌아가기</button>
        </div>
      </div>
    </>
  );
}
