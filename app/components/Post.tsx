import { backgroundImage } from "html2canvas/dist/types/css/property-descriptors/background-image";
import { formatCountNumber } from "../scripts/count";
import "./Post.css";
import { visibility } from "html2canvas/dist/types/css/property-descriptors/visibility";

interface PostProps {
  writerNickname?: string | null;
  writeTime?: string | null;
  title?: string | null;
  tagList?: string | null;
  description?: string | null;
  writerId?: string | null;
  chat?: number | null;
  like?: number | null;
  bookmark?: number | null;
}

export default function PostComponent(Details: PostProps) {
  const grayIfNull = (value: any, color:string, Width:string) => 
    value === null || value === undefined ? { backgroundColor: color, width: Width} : { backgroundColor: "transparent"};
  const hiddenSvg = (value: any) => value === null || value === undefined ? { width: "0" } : { width: "0.75rem" };
  return (
    <>
      <div className="post-container">
        <div className="post-item">
          <div className="post-contents-text-container">
            <div className="post-contents-title" style={grayIfNull(Details.title,"#a2a2a2","50%")}>
              {Details.title}
            </div>
            <div className="post-contents-description" style={grayIfNull(Details.title,"#e2e2e2","30%")}>
              {Details.description}
            </div>
            <div className="post-contents-taglist" style={grayIfNull(Details.title,"#e2e2e2","20%")}>
              {Details.tagList}
            </div>
          </div>

          <div className="post-contents-img-container"></div>

          <div className="post-contents-info">
            <div className="post-contents-writer">
              <div className="post-contents-profile-pic"></div>
              <div className="post-contents-profile-text">
                <div className="post-contents-author" style={grayIfNull(Details.title,"#a2a2a2","3rem")}>
                  {Details.writerNickname}
                </div>
                <div className="post-contents-id" style={grayIfNull(Details.title,"#e2e2e2","5rem")}>
                  {Details.writerId} · {Details.writeTime}
                </div>
              </div>
            </div>
            <div className="post-contents-show-count">
              <div className="chats" style={grayIfNull(Details.title,"#a2a2a2","5%")}>
                <img className="chat" src=".\app\assets\chat.svg" style={hiddenSvg(Details.title)} />
                <div className="chat-count">
                  {formatCountNumber(Details.chat ?? 0)}
                </div>
              </div>
              <div className="likes" style={grayIfNull(Details.title,"#e2e2e2","5%")}>
                <img className="heart" src=".\app\assets\heart.svg" style={hiddenSvg(Details.title)}/>
                <div className="like-count">
                  {formatCountNumber(Details.like ?? 0)}
                </div>
              </div>
              <div className="bookmarks" style={grayIfNull(Details.title,"#e2e2e2","5%")}>
                <img className="book-open" src=".\app\assets\book-open.svg" style={hiddenSvg(Details.title)} />
                <div className="bookmark-count">
                  {formatCountNumber(Details.bookmark ?? 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
