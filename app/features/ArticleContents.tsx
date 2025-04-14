import "./ArticleContentsStyle.css";

export default function ArticleContents() {
  return (
    <>
      <div className="article-contents-frame">
        <div className="map">
          <div className="subject">제목</div>
          <div className="bottom-container">
            <div className="tag-list">#태그 #조선대학교 #광주</div>
            <div className="description">설명 / 광주광역시 동구 서석동에 위치한 4년제 사립 종합대학이자 최초의민립대학이다.
              1946년 개교하였으며, 산하에 조선대학교부속고등학교, 조선대학교 ...
            </div>
          </div>
        </div>
        <div className="show-detail">
          <div className="writer">
            <div className="profile-pic"></div>
            <div className="text">
              <div className="author">작성자</div>
              <div className="id">@user_id · 2025/01/23 12:34 PM</div>
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
      </div>
    </>
  )
}