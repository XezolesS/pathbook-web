import './LandingContentsViewer.css';

export default function LandingContentsViewer() {
  return (
    <>
      <div className="viewer">
        <div className="background-img">
          <img className="swipe-left" src=".\app\features\assets\arrow3.svg" />
          <img className="swipe-right" src=".\app\features\assets\arrow3.svg" />

          <div className="show-detail">
            <div className="writer">
              <div className="profile-pic"></div>
              <div className="text">
                <div className="author">작성자</div>
                <div className="id">@user_id · 2025/01/23 12:34 PM</div>
              </div>
            </div>
            <div className="show-count">
              <div className="bookmarks">
                <img className="book-open" src=".\app\features\assets\book-open.svg" />
                <div className="bookmark-count">2,025</div>
              </div>
              <div className="likes">
                <img className="heart" src=".\app\features\assets\heart.svg" />
                <div className="like-count">2,025</div>
              </div>
            </div>
          </div>

          <div className="overlay-content">
            <div className="left-desc">
              <div className="post-title">제목</div>
              <div className="post-content">
                여기는 자신이 그린 코스에 대한 설명을 부여할 수 있다. 여기부터 해당 루트에 대한 설명을 잘라서 보여준다. 2줄 까지만 나오고 그 이상으로 길어지면 이렇게 ...으로 보이도록 설정해놨다.
              </div>
            </div>
          
          
            <div className="right-desc">
              <div className="hashtag">#도보 #테마 #해시태그</div>
              <div className="location-detail">
                광주 광역시 서석동 / 위치
                <br />
                20분 / 예상 주행 시간
              </div>
            </div>
          </div>
        </div>

        <div className="page-indicator">
          <div className="indicator1"></div>
          <div className="indicator2"></div>
          <div className="indicator3"></div>
          <div className="indicator4"></div>
          <div className="indicator5"></div>        
        </div>
      </div>
    </>
  )
}
