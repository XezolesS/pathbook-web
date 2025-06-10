import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Post } from "../api/pathbook/types/Post";
import ArticleContentsDetail from "../components/PostDetail.js";
import postMockups from "../mock/PostMockups.json";
import "./Main.css";
import type { Route } from "./pages/+types/PostDetailPage";

export async function loader({ request, params }: Route.LoaderArgs) {
  return { postId: params.postid };
}

export default function PostDetailPage({ loaderData }: Route.ComponentProps) {
  const { postId } = loaderData;

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  console.log(postId);

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
      const post = posts.find((post) => post.postId == postId) as Post;

      console.log(post);
      setSelectedPost(post);
    };

    load();
  }, []);

  return (
    <>
      <div className="article-detail-contents">
        {selectedPost && (
          <>
            <ArticleContentsDetail post={selectedPost} />
          </>
        )}
      </div>
    </>
  );
}
