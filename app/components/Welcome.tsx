import "./Welcome.css";

export default function WelcomeComponent() {
  return (
    <>
      <div className="catchphrase">길을 책으로, 추억을 걷다<br/>Pathbook.</div>

      <div className="intro-section">
        <ul>
          <li>
            기억을 남기고 싶은 모든 이들을 위한, Pathbook
            당신이 좋아하는 길, 익숙한 거리, 그 길 위의 장면들.
            Pathbook은 단순한 경로가 아니라 기억을 걷는 방법입니다.
          </li>
          <br/>
          <li>
            기억하고 싶은 길, 책처럼 담다
            언젠가 다시 걷고 싶은 길이 있나요?
            오늘의 산책, 어제의 드라이브, 마음속에 담고 싶은 장소들.
            Pathbook은 그 모든 경로를, 한 권의 책처럼 기록합니다.
          </li>
        </ul>
      </div>

      <div className="join-section">
        <div className="join-section-title">
          내가 자주다니는 길을 공유하고 싶다면?
        </div>
        <button
          className="button-theme"
          onClick={() => (window.location.href = "/Register")}
        >
          <div className="button-text">지금 가입하기</div>
        </button>
        <div className="guest-text">
          <a href="main">또는 익명으로 둘러보기</a>
        </div>
      </div>
    </>
  );
}
