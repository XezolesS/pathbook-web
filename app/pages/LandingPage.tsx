import { redirect } from "react-router";
import textLogo from "../assets/textLogo.png";
import Details from "../components/Details";
import LandingContentsViewer from "../components/PostSlidePreview";
import Welcome from "../components/Welcome";
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
      <div className="landing-main-container">
        <div className="landing-container">
          <div className="welcome">
            <div className="logo">
              <a href="./#">
                <img src={textLogo}></img>
              </a>
            </div>
            <Welcome />
          </div>

          <div className="landing-container-right">
            <a href="/login" className="login-button-text">
              <div className="login-button">로그인</div>
            </a>
            <div className="landing-contents-viewer">
              <LandingContentsViewer />
            </div>
          </div>
        </div>
      </div>

      <div className="landing-details-container">
        <div className="details-container">
          <Details />
        </div>
      </div>

      <div className="footer-container">footer</div>
    </>
  );
}
