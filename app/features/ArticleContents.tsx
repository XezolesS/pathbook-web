import "./ArticleContentsStyle.css";
import { formatCountNumber } from '../scripts/count';

interface ArticleContentsProps{
  writerNickname: string;
  writeTime: string;
  title: string;
  tagList: string;
  description: string;
  writerId: string;
  chat: number;
  like: number;
  bookmark: number;
}

export default function ArticleContents(Details: ArticleContentsProps) {
  return (
    <>
      <div className="article-contents-frame">
        <div className="map">
          <div className="subject">{Details.title}</div>
          <div className="bottom-container">
            <div className="tag-list">{Details.tagList}</div>
            <div className="description">{Details.description}
            </div>
          </div>
        </div>
        <div className="show-detail">
          <div className="writer">
            <div className="profile-pic"></div>
            <div className="text">
              <div className="author">{Details.writerNickname}</div>
              <div className="id">{Details.writerId} · {Details.writeTime}</div>
            </div>
          </div>
          <div className="show-count">
            <div className="chats">
              <img className="chat" src=".\app\assets\chat.svg" />
              <div className="chat-count">{formatCountNumber(Details.chat)}</div> 
            </div>
            <div className="likes">
              <img className="heart" src=".\app\assets\heart.svg" />
              <div className="like-count">{formatCountNumber(Details.like)}</div>
            </div>
            <div className="bookmarks">
              <img className="book-open" src=".\app\assets\book-open.svg" />
              <div className="bookmark-count">{formatCountNumber(Details.bookmark)}</div>
            </div>
              
          </div>
        </div>
      </div>
    </>
  )
}