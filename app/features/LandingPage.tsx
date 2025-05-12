import { redirect } from "react-router";
import textLogo from "../assets/textLogo.png";
import { checkAuthToken } from "../scripts/auth";
import type { Route } from "./+types/LandingPage";
import Details from "./Details";
import LandingContentsViewer from "./LandingContentsViewer";
import "./LandingPageStyle.css";
import Welcome from "./Welcome";

export async function loader() {
  let isAuthenticated = checkAuthToken();

  if (isAuthenticated) {
    throw redirect("/main");
  }

  return { isAuthenticated: isAuthenticated }
}

export default function LandingPage({
  loaderData,
}: Route.ComponentProps) {
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
