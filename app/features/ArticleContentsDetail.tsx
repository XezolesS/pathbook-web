import "./ArticleContentsDetailStyle.css";

export default function ArticleContents() {
  return (
    <>
      <div className="article-contents-frame">
        <div className="map"></div>
        <div className="show-detail">
          <div className="writer">
            <div className="profile-pic"></div>
            <div className="text">
              <div className="author">작성자</div>
              <div className="id-with-time">
                <div className="id">@user_id</div>
                <div className="time">2025/01/23 12:34 PM</div>
              </div>
            </div>
          </div>
          <div className="show-count">
            <div className="chats">
              <img className="chat" src=".\app\features\assets\chat.svg" />
              <div className="chat-count">12</div>
            </div>
            <div className="likes">
              <img className="heart" src=".\app\features\assets\heart.svg" />
              <div className="like-count">2,025</div>
            </div>
            <div className="bookmarks">
              <img className="book-open" src=".\app\features\assets\book-open.svg" />
              <div className="bookmark-count">2,025</div>
            </div>
          </div>
        </div>
        <div className="show-text">
          <div className="subject">제목</div>
          <div className="tag-list">#태그 #조선대학교 #광주</div>
          <div className="description">설명 / 광주광역시 동구 서석동에 위치한 4년제 사립 종합대학이자 최초의민립대학이다.
            1946년 개교하였으며, 산하에 조선대학교부속고등학교, 조선대학교 등
          </div>
        </div>

        <div className="comment-desc">
          <img className="chat" src=".\app\features\assets\chat.svg" />
          <div className="comment-explain">댓글</div>
        </div>

        <div className="comment-container">
          <div className="comment-textarea">
            <div className="profile-pic"></div>
            <input className="comment-input" type="text" placeholder="댓글을 입력하세요." />
            <button className="comment-push">작성하기</button>
          </div>
          <div className="comment-list">
            <div className="comment-item">
              <div className="writer">
                <div className="profile-pic"></div>
                <div className="space">
                  <div className="text">댓글달아요. 가끔은 이런 긴 댓글도 달 수 있잖아요? 그럴 때 칸과 박스가 어떻게 변하는지, 글씨가 넘치지는 않는지 확인할 필요가 있잖아요? </div>
                  <div className="comment-info">
                    <div className="id-with-time">
                      <div className="id">@user_id</div>
                      <div className="time">2025/01/23 12:34 PM</div>
                    </div>
                    <div className="comment-likes">
                      <img className="heart" src=".\app\features\assets\heart.svg" />
                      <div className="cm-like-count">45</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reply-item">
              <div className="writer">
                <div className="profile-pic"></div>
                <div className="space">
                  <div className="text">답글달아요 근데 댓글이 길지 않으면?</div>
                  <div className="comment-info">
                    <div className="id-with-time">
                      <div className="id">@user_id</div>
                      <div className="time">2025/01/23 12:34 PM</div>
                    </div>
                    <div className="comment-likes">
                      <img className="heart" src=".\app\features\assets\heart.svg" />
                      <div className="cm-like-count">5</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="comment-item">
              <div className="writer">
                <div className="profile-pic"></div>
                <div className="space">
                  <div className="text">댓글달아요</div>
                  <div className="comment-info">
                    <div className="id-with-time">
                      <div className="id">@user_id</div>
                      <div className="time">2025/01/23 12:34 PM</div>
                    </div>
                    <div className="comment-likes">
                      <img className="heart" src=".\app\features\assets\heart.svg" />
                      <div className="cm-like-count">1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}