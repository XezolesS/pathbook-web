import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PostCard from "../components/Post";
import PostListRequest from "../api/pathbook/requests/post/GetPostList";
import type { Post } from "../api/pathbook/types/Post";
import search_svg from "../assets/search.svg";
import write_svg  from "../assets/write.svg";
import "./Main.css";

export default function PostMainViewPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setPosts(await new PostListRequest().send());
      } catch (e) {
        console.error("목록 로드 실패:", e);
      }
    })();
  }, []);

  return (
    <>
      <header className="content-head">
        <input className="search-textbox" />
        <img className="search-button" src={search_svg} alt="search"/>
        <img className="write-button"  src={write_svg}  alt="write"
             onClick={() => navigate("/post/write")}/>
      </header>

      <section className="article-contents">
        {posts.map(p => (
          <div key={p.id} onClick={() => navigate(`/post/${p.id}`)}>
            <PostCard post={p}/>
          </div>
        ))}
      </section>
    </>
  );
}
