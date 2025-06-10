import { useEffect, useRef, useState } from "react";
import MeRequest from "../api/pathbook/requests/auth/MeRequest.js";
import type { User } from "../api/pathbook/types/User";
import book_svg from "../assets/book.svg";
import home_svg from "../assets/home.svg";
import heart_svg from "../assets/heart2.svg";
import flag_svg from "../assets/flag.svg";
import check_svg from "../assets/check.svg";
import question_svg from "../assets/question.svg";
import ring_svg from "../assets/ring.svg";
import search_svg from "../assets/search.svg";
import star_svg from "../assets/star.svg";
import write_svg from "../assets/write.svg";
import AnonymousProfileComponent from "../components/AnonymousProfile.js";
import ArticleContents from "../components/Post.js";
import ArticleContentsDetail from "../components/PostDetail.js";
import ArticleWrite from "../components/PostWrite.js";
import UserProfileComponent from "../components/UserProfile.js";
import postMockups from "../mock/PostMockups.json";
import { parseCookies } from "../scripts/cookie.ts";
import PostListRequest from "../api/pathbook/requests/post/GetPostList.ts";
import PostDetailRequest from "../api/pathbook/requests/post/GetPostDetailRequest.ts";
import "./Main.css";
import type { Route } from "./pages/+types/Main";
import { backgroundImage } from "html2canvas/dist/types/css/property-descriptors/background-image";
import { Post } from "../api/pathbook/types/Post";

export async function loader({ request }: Route.ClientLoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader);

  const loggedIn = cookies.get("logged_in");

  return { loggedIn: loggedIn };
}

export default function MainPage({ loaderData }: Route.ComponentProps) {
  const { loggedIn } = loaderData;

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedMenu, setSelectedMenu] = useState("menu-home");
  const [showWrite, setShowWrite] = useState(false);
  const [showContentsDetail, setContentsDetail] = useState(false);
  const [loadedPosts, setLoadedPosts] = useState<Post[] | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // 게시글 관련 정보 불러오기
  useEffect(() => {
    /*
    const fetchPosts = async () => {
      const request = new PostListRequest();
      const response = await request.send();
      console.log(response);
    };
    const loadPostDetail = async (postId: number) => {
    const request = new PostDetailRequest(postId);
    const post = await request.send();
    console.log(post.title, post.content, post.id);
    };
    fetchPosts();
    */

    // mockup 로딩
    const fetchPosts = async () => {
      return postMockups;
    };

    const load = async () => {
      const posts = await fetchPosts();
      setLoadedPosts(posts);
    };

    load();
  }, []);

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
          <div className="Kategorie-container">
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
          {loadedPosts?.map((post) => (
            <div
              key={post.postId}
              onClick={() => {
                setSelectedPost(post);
                setContentsDetail(true);
              }}
            >
              <ArticleContents post={post} />
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
          {selectedPost && (
            <>
              <ArticleContentsDetail
                post={selectedPost}
                cancelOnClick={() => {
                  setSelectedPost(null)
                  setContentsDetail(false)
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
