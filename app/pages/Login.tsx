import { redirect, useNavigate } from "react-router";
import LoginRequest from "../api/pathbook/requests/auth/LoginRequest";
import textLogo from "../assets/textLogo.png";
import { parseCookies } from "../scripts/cookie";
import type { Route } from "./pages/+types/Login";
import "./Login.css";

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader);

  const isLoggedIn = cookies.get("logged_in");

  if (isLoggedIn) {
    throw redirect("/main");
  }

  return { isLoggedIn: isLoggedIn };
}

export default function LoginPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  const handleLoginAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const request = new LoginRequest(email, password);

    try {
      const response = await request.send();
      console.debug(response);

      navigate("/main");
    } catch (error) {
      console.error("Login failed:", error);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <>
      <div className="logo">
        <a href="./#">
          <img src={textLogo}></img>
        </a>
      </div>
      <div className="login">
        <div className="login-container">
          <div className="login-text">로그인</div>
          <form className="login-form" action={handleLoginAction}>
            <div className="login-form-section">
              <label htmlFor="email">이메일</label>
              <input
                className="input input-email"
                type="email"
                id="email"
                name="email"
                placeholder="이메일을 입력하세요"
                required
              />
            </div>
            <div className="login-form-section">
              <label htmlFor="password">비밀번호</label>
              <input
                className="input input-password"
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            <label className="logged-checkbox" htmlFor="keep-logged">
              <input type="checkbox" id="keep-logged" name="keepLogged" />
              로그인 상태 유지
            </label>
            <button type="submit" className="login-form-submit">
              로그인
            </button>
          </form>
        </div>
      </div>

      <div className="other-menu-container">
        <a href="/register">회원가입</a>
        <a href="/reset-password-request">비밀번호를 잊어버렸어요</a>
      </div>
    </>
  );
}
