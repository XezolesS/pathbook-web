import React, { useState } from "react";
import "./MyPage.css";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("닉네임");
  const [bio, setBio] = useState("바이오 / 상태 메시지");
  const [bgImage, setBgImage] = useState("/app/assets/image/samplepic1_a.jpg");
  const [profileImage, setProfileImage] = useState("/app/assets/image/samplepic2.jpg");

  const [showBgModal, setShowBgModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [selectedFileName, setSelectedFileName] = useState("선택된 파일 없음");

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "background" | "profile"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (type === "background") {
          setBgImage(fileReader.result as string);
          setShowBgModal(false);
        } else {
          setProfileImage(fileReader.result as string);
          setShowProfileModal(false);
        }
        setSelectedFileName(file.name);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const renderModal = (type: "background" | "profile") => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{type === "background" ? "배경 이미지 업로드" : "프로필 이미지 업로드"}</h3>
        <div className="file-upload-wrapper">
          <label htmlFor={`${type}-upload`} className="file-upload-label">
            파일 선택
          </label>
          <input
            id={`${type}-upload`}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, type)}
          />
          <div className="selected-file-name">{selectedFileName}</div>
        </div>
        <button onClick={() => {
          type === "background" ? setShowBgModal(false) : setShowProfileModal(false);
        }}>
          닫기
        </button>
      </div>
    </div>
  );

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
      <div
        className="mypage-header"
        onClick={() => setShowBgModal(true)}
        style={{ cursor: "pointer" }}
      >
        <img src={bgImage} alt="배경 이미지" />
      </div>

      {showBgModal && renderModal("background")}
      {showProfileModal && renderModal("profile")}

      <div className="mypage-profile">
        <div
          className="profile-image"
          style={{ backgroundImage: `url(${profileImage})`, backgroundSize: "cover" }}
          onClick={() => setShowProfileModal(true)}
        />
        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </>
          ) : (
            <>
              <h2>
                {nickname} <span>@아이디</span>
              </h2>
              <p>{bio}</p>
            </>
          )}
        </div>
        <button
          className="edit-button"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "저장" : "프로필 편집하기"}
        </button>
      </div>

      <div className="mypage-tabmenu">
        <div
          className={`tab-item ${activeTab === "posts" ? "active" : ""}`}
          onClick={() => setActiveTab("posts")}
        >
          작성글
        </div>
        <div
          className={`tab-item ${activeTab === "comments" ? "active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          작성 댓글
        </div>
        <div
          className={`tab-item ${activeTab === "likes" ? "active" : ""}`}
          onClick={() => setActiveTab("likes")}
        >
          좋아요
        </div>
        <div
          className={`tab-item ${activeTab === "bookmarks" ? "active" : ""}`}
          onClick={() => setActiveTab("bookmarks")}
        >
          북마크
        </div>
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
  <div className="mypage-content">
    <div className="content-area">{label} (비워둠)</div>
  </div>
);


export default MyPage;
