import { useEffect, useRef, useState } from "react";
import UserRequest from "../api/pathbook/requests/auth/UserRequest.ts";
import type { User } from "../api/pathbook/types/User";
import book_svg from "../assets/book.svg";
import home_svg from "../assets/home.svg";
import menu_svg from "../assets/menu.svg";
import ring_svg from "../assets/ring.svg";
import search_svg from "../assets/search.svg";
import star_svg from "../assets/star.svg";
import write_svg from "../assets/write.svg";
import AnonymousProfileComponent from "../components/AnonymousProfile.js";
import ArticleContents from "../components/Post.js";
import ArticleContentsDetail from "../components/PostDetail.js";
import ArticleWrite from "../components/PostWrite.js";
import UserProfileComponent from "../components/UserProfile.js";
import articleList from "../mock/ArticleData.json";
import { parseCookies } from "../scripts/cookie.ts";
import "./Main.css";
import type { Route } from "./pages/+types/Main";

export async function loader({ request }: Route.ClientLoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader);

  const loggedIn = cookies.get("logged_in");

  return { loggedIn: loggedIn };
}

export default function MainPage({ loaderData }: Route.ComponentProps) {
  const { loggedIn } = loaderData;

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedArticleID, setSelectedArticleID] = useState<number | null>(
    null
  );
  const [selectedMenu, setSelectedMenu] = useState("menu-home");
  const [showWrite, setShowWrite] = useState(false);
  const [showContentsDetail, setContentsDetail] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const selectedData = articleList.find(
    (item) => item.articleID === selectedArticleID
  );

  // 유저 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      console.log(loggedIn);
      if (!loggedIn) {
        setCurrentUser(null);
        return;
      }

      try {
        const userRequest = new UserRequest();
        const userResponse = await userRequest.send();

        console.log(userResponse);

        setCurrentUser(userResponse.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // 뒤로가기 무효화
    history.pushState(null, "", location.href);
    const handlePopState = (e: PopStateEvent) => {
      location.reload();
    };
    window.addEventListener("popstate", handlePopState);

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
      window.removeEventListener("popstate", handlePopState);
    };
  });

  return (
    <div className="mainpage">
      <div className="main-menu-container">
        <div className="menu-container" ref={menuRef}>
          {currentUser ? (
            <UserProfileComponent user={currentUser} />
          ) : (
            <AnonymousProfileComponent />
          )}
          {[
            { name: "menu-home", icon: home_svg, label: "===========" },
            { name: "menu-star", icon: star_svg, label: "===========" },
            { name: "menu-ring", icon: ring_svg, label: "===========" },
            { name: "menu-book", icon: book_svg, label: "===========" },
            { name: "menu-menu", icon: menu_svg, label: "===========" },
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

      <div className="main-content-container">
        <div className="content-head">
          <input className="search-textbox" />
          <img className="search-button" src={search_svg} alt="search" />
          <img
            className="write-button"
            src={write_svg}
            alt="write"
            onClick={() => {
              setShowWrite((prev) => !prev);
            }}
          />
        </div>

        {/*여기 아래 부터 동적 컴포넌트 영역*/}

        {/*글 작성 컴포넌트*/}
        <div
          className="articlewrite-container"
          style={{ display: showWrite ? "block" : "none" }}
        >
          <ArticleWrite cancelOnclick={() => setShowWrite(false)} />
        </div>

        {/*콘텐츠 뷰 컴포넌트*/}
        <div
          className="article-contents"
          onClick={() => setContentsDetail(true)}
          style={{
            display: !showContentsDetail && !showWrite ? "block" : "none",
          }}
        >
          {articleList.slice(0, 3).map((article) => (
            <div
              key={article.articleID}
              onClick={() => {
                setSelectedArticleID(article.articleID);
                setContentsDetail(true);
              }}
            >
              <ArticleContents
                title={article.title}
                writerNickname={article.writerNickname}
                writeTime={article.writeTime}
                tagList={article.tagList}
                description={article.description}
                writerId={article.writerId}
                chat={article.chat}
                like={article.like}
                bookmark={article.bookmark}
              />
            </div>
          ))}
        </div>

        {/*작성된 글 컴포넌트 */}
        <div
          className="article-detail-contents"
          style={{
            display: showContentsDetail && !showWrite ? "block" : "none",
          }}
        >
          {selectedData && (
            <>
              <ArticleContentsDetail
                title={selectedData.title}
                writerNickname={selectedData.writerNickname}
                writeTime={selectedData.writeTime}
                tagList={selectedData.tagList}
                description={selectedData.description}
                writerId={selectedData.writerId}
                chat={selectedData.chat}
                like={selectedData.like}
                bookmark={selectedData.bookmark}
                cancelOnclick={() => setContentsDetail(false)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
