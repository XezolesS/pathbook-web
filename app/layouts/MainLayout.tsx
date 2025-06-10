import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import MeRequest from "../api/pathbook/requests/auth/MeRequest.js";
import type { User } from "../api/pathbook/types/User";
import book_svg from "../assets/book.svg";
import check_svg from "../assets/check.svg";
import heart_svg from "../assets/heart2.svg";
import home_svg from "../assets/home.svg";
import question_svg from "../assets/question.svg";
import ring_svg from "../assets/ring.svg";
import AnonymousProfileComponent from "../components/AnonymousProfile.js";
import UserProfileComponent from "../components/UserProfile.js";
import { parseCookies } from "../scripts/cookie.ts";
import "./MainLayout.css";
import type { Route } from "./pages/+types/MainLayout";

export async function loader({ request }: Route.ClientLoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader);

  const loggedIn = cookies.get("logged_in");

  return { loggedIn: loggedIn };
}

export default function MainLayout({ loaderData }: Route.ComponentProps) {
  const { loggedIn } = loaderData;

  return (
    <div className="mainpage">
      <div className="main-menu-container">
        <Sidebar loggedIn={loggedIn} />
      </div>

      <div className="main-content-container">
        <Outlet />
      </div>
    </div>
  );
}

export function Sidebar({ loggedIn }: { loggedIn: boolean }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedMenu, setSelectedMenu] = useState("menu-home");

  const menuRef = useRef<HTMLDivElement | null>(null);

  // 유저 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      console.log(loggedIn);
      if (!loggedIn) {
        setCurrentUser(null);
        return;
      }

      try {
        const meRequest = new MeRequest();
        const userResponse = await meRequest.send();

        console.log(userResponse);

        setCurrentUser(userResponse.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  // 사이드바 위치 고정
  useEffect(() => {
    const handleScroll = () => {
      if (!menuRef.current) return;
      const menuHeight = menuRef.current.offsetHeight;
      const centerOffset = (window.innerHeight - menuHeight) / 2;
      menuRef.current.style.top = window.scrollY + centerOffset + "px";
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <div className="menu-container fixed" ref={menuRef}>
        <div className="profile-container">
          {currentUser ? (
            <UserProfileComponent user={currentUser} />
          ) : (
            <>
              <div className="profile-image-anonymous"></div>
              <AnonymousProfileComponent />
            </>
          )}
        </div>
        <div className="category-container">
          {[
            { name: "menu-home", icon: home_svg, label: "메인 페이지" },
            { name: "menu-ring", icon: ring_svg, label: "공지글" },
            { name: "menu-1", icon: heart_svg, label: "인기글" },
            { name: "menu-2", icon: check_svg, label: "인증글" },
            { name: "menu-3", icon: question_svg, label: "질문글" },
            { name: "menu-book", icon: book_svg, label: "북마크" },
          ].map((item) => (
            <div
              key={item.name}
              className={`menu-item ${
                selectedMenu === item.name ? "selected" : ""
              }`}
              onClick={() => setSelectedMenu(item.name)}
            >
              <img className={item.name} src={item.icon} alt={item.name} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
