import { useLocation } from "react-router";
import ArticleWrite from "../components/PostWrite.js";
import { Post } from "../api/pathbook/types/Post";
import "./Main.css";

export default function PostWritePage() {
  const location     = useLocation();
  const editingPost  = location.state?.post as Post | undefined;

  return (
    <div className="articlewrite-container">
      <ArticleWrite editingPost={editingPost} /> 
    </div>
  );
}