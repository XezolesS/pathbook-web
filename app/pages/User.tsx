import React, { useState } from "react";
import "./User.css";
import type { User } from "../api/pathbook/types/User";
import type { Route } from "./pages/+types/User";

export async function loader({ request }: Route.LoaderArgs) {


  return {};
}

export default function UserPage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("닉네임");
  const [bio, setBio] = useState("바이오 / 상태 메시지");
  const [bgImage, setBgImage] = useState("/app/assets/image/samplepic1_a.jpg");
  const [profileImage, setProfileImage] = useState(
    "/app/assets/image/samplepic2.jpg"
  );

  const [showBgModal, setShowBgModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("선택된 파일 없음");

  const [tabData, setTabData] = useState<any[]>([]);
  const [tabLoading, setTabLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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

  const handleEditSave = async () => {
    try {
      // await new UpdateProfileRequest(nickname, bio).send();
      setIsEditing(false);
      alert("프로필이 저장되었습니다.");
    } catch {
      alert("프로필 저장에 실패했습니다.");
    }
  };

  const renderModal = (type: "background" | "profile") => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>
          {type === "background"
            ? "배경 이미지 업로드"
            : "프로필 이미지 업로드"}
        </h3>
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
        <button
          onClick={() => {
            type === "background"
              ? setShowBgModal(false)
              : setShowProfileModal(false);
          }}
        >
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
        onClick={
          isEditing
            ? () => setShowBgModal(true)
            : () => {
                /* 이미지 확대 */
              }
        }
        style={{ cursor: "pointer" }}
      >
        <img src={bgImage} alt="배경 이미지" />
      </div>

      {showBgModal && renderModal("background")}
      {showProfileModal && renderModal("profile")}

      <div className="mypage-profile">
        <div className="profile-left">
          <div
            className="profile-image"
            style={{
              backgroundImage: `url(${profileImage})`,
              backgroundSize: "cover",
            }}
            onClick={
              isEditing
                ? () => setShowProfileModal(true)
                : () => {
                    /* 이미지 확대 */
                  }
            }
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
        </div>

        <div className="profile-buttons">
          <button
            className="edit-button"
            onClick={
              isEditing ? () => handleEditSave() : () => setIsEditing(true)
            }
          >
            {isEditing ? "저장" : "프로필 편집하기"}
          </button>
        </div>
      </div>

      <div className="mypage-tabmenu">
        {["posts", "comments", "likes", "bookmarks"].map((tab) => (
          <div
            key={tab}
            className={`tab-item cursor-pointer ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "posts" && "작성글"}
            {tab === "comments" && "작성 댓글"}
            {tab === "likes" && "좋아요"}
            {tab === "bookmarks" && "북마크"}
          </div>
        ))}
      </div>

      <div className="mypage-searchbar">
        <input type="text" placeholder="검색..." />
        <button>＋</button>
      </div>

      {renderContent()}
    </div>
  );
}

const EmptyContent = ({ label }: { label: string }) => (
  <div className="mypage-content">
    <div className="content-area">{label}</div>
  </div>
);
