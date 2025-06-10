import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Post } from "../api/pathbook/types/Post";
import search_svg from "../assets/search.svg";
import write_svg from "../assets/write.svg";
import ArticleContents from "../components/Post.js";
import postMockups from "../mock/PostMockups.json";
import "./Main.css";

export default function PostMainViewPage() {
  const navigate = useNavigate();
  const [loadedPosts, setLoadedPosts] = useState<Post[] | null>(null);

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

  return (
    <>
      <div className="content-head">
        <input className="search-textbox" />
        <img className="search-button" src={search_svg} alt="search" />
        <img
          className="write-button"
          src={write_svg}
          alt="write"
          onClick={() => {
            navigate("/post/write");
          }}
        />
      </div>

      <div className="article-contents">
        {loadedPosts?.map((post) => (
          <div
            key={post.postId}
            onClick={() => navigate("/post/" + post.postId)}
          >
            <ArticleContents post={post} />
          </div>
        ))}
      </div>
    </>
  );
}
