import { redirect, useNavigate } from "react-router";
import IndicatorArrow from "../assets/indicator_arrow.svg";
import LogoImage from "../assets/logo_image.png";
import Details from "../components/Details";
import { parseCookies } from "../scripts/cookie";
import "./LandingPage.css";
import type { Route } from "./pages/+types/LandingPage";

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader);

  const isLoggedIn = cookies.get("logged_in");

  if (isLoggedIn) {
    throw redirect("/main");
  }

  return { isLoggedIn: isLoggedIn };
}

export default function LandingPage({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <div className="landing-container">
        <div className="landing-info">
          <div className="info-header">
            <LogoComponent />
            <LoginButtonComponent />
          </div>
          <div className="info-body">
            <div className="info-content">
              <h1 className="text-4xl font-bold">캐치프레이즈</h1>
              <div className="desc-container">
                <p className="desc">
                  description here loooooooooooooooooooooooooooooooong
                </p>
                <p className="desc">description here</p>
                <p className="desc">description here</p>
                <p className="desc">description here</p>
                <p className="desc">description here</p>
                <p className="desc">description here</p>
                <p className="desc">description here</p>
                <p className="desc">description here</p>
                <p className="desc">description here</p>
              </div>
              <div className="attract-container">
                <p>내가 자주다니는 길을 공유하고 싶다면?</p>
                <RegisterButtonComponent />
                <GuestLinkComponent />
              </div>
            </div>
            <div className="post-preview-container">
              <PostPreviewComponent />
            </div>
          </div>
        </div>

        <div className="landing-details-container">
          <div className="details-container">
            <Details />
          </div>
        </div>

        <div className="footer-container">footer</div>
      </div>
    </>
  );
}

function LogoComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="w-60">
        <a onClick={handleClick}>
          <img title="logo" src={LogoImage}></img>
        </a>
      </div>
    </>
  );
}

function LoginButtonComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <button className="button-theme" onClick={handleClick}>
        로그인
      </button>
    </>
  );
}

function RegisterButtonComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <>
      <button
        className="button-accent text-2xl font-bold tracking-widest"
        onClick={handleClick}
      >
        지금 가입하기
      </button>
    </>
  );
}

function GuestLinkComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/main");
  };

  return (
    <>
      <p
        className="pointer font-light tracking-widest underline underline-offset-4"
        onClick={handleClick}
      >
        또는 익명으로 둘러보기
      </p>
    </>
  );
}

function PostPreviewComponent() {
  interface PostProps {
    authorId: string;
    authorName: string;
    content: string;
    createdAt: Date;
    likes: number;
    bookmarks: number;
  }

  return (
    <>
      <div className="relative flex h-full w-full min-w-2xl flex-col items-center">
        {/* 지도 이미지 */}
        <div className="post-preview-image">
          <img src=""></img>
        </div>

        {/* 글 정보 */}
        <div className="post-preview-desc"></div>

        {/* 인디케이터 */}
        <div className="post-preview-indicator"></div>

        {/* 오버레이 */}
        <div className="absolute block h-full w-full">
          <img src={IndicatorArrow}></img>
        </div>

        <div className="background-img">
          <img className="swipe-left" src=".\app\assets\arrow3.svg" />
          <img className="swipe-right" src=".\app\assets\arrow3.svg" />

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
                <img className="book-open" src=".\app\assets\book-open.svg" />
                <div className="bookmark-count">2,025</div>
              </div>
              <div className="likes">
                <img className="heart" src=".\app\assets\heart.svg" />
                <div className="like-count">2,025</div>
              </div>
            </div>
          </div>

          <div className="overlay-content">
            <div className="left-desc">
              <div className="post-title">제목</div>
              <div className="post-content">
                여기는 자신이 그린 코스에 대한 설명을 부여할 수 있다. 여기부터
                해당 루트에 대한 설명을 잘라서 보여준다. 2줄 까지만 나오고 그
                이상으로 길어지면 이렇게 ...으로 보이도록 설정해놨다.
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
  );
}
