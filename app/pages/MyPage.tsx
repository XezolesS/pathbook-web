import React, { useState } from "react";
import "./MyPage.css";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const renderContent = () => {
    switch (activeTab) {
      case "posts":
        return <EmptyContent label="작성글" />;
      case "comments":
        return <EmptyContent label="작성 댓글" />;
      case "likes":
        return <EmptyContent label="좋아요" />;
      case "bookmarks":
        return <EmptyContent label="북마크" />;
      default:
        return null;
    }
  };

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <img src="/header.jpg" alt="배경 이미지" />
      </div>

      <div className="mypage-profile">
        <div className="profile-image" />
        <div className="profile-info">
          <h2>닉네임 <span>@아이디</span></h2>
          <p>바이오 / 상태 메시지</p>
        </div>
        <button className="edit-button">프로필 편집하기</button>
      </div>

      <div className="mypage-tabmenu">
        <div className={`tab-item ${activeTab === "posts" ? "active" : ""}`} onClick={() => setActiveTab("posts")}>작성글</div>
        <div className={`tab-item ${activeTab === "comments" ? "active" : ""}`} onClick={() => setActiveTab("comments")}>작성 댓글</div>
        <div className={`tab-item ${activeTab === "likes" ? "active" : ""}`} onClick={() => setActiveTab("likes")}>좋아요</div>
        <div className={`tab-item ${activeTab === "bookmarks" ? "active" : ""}`} onClick={() => setActiveTab("bookmarks")}>북마크</div>
      </div>

      <div className="mypage-searchbar">
        <input type="text" placeholder="검색..." />
        <button>＋</button>
      </div>

      {renderContent()}
    </div>
  );
};

const EmptyContent = ({ label }: { label: string }) => (
  <div className="mypage-empty">
    {label} (비워둠)
  </div>
);

export default MyPage;
