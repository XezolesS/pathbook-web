import React, { useState, useEffect, useRef } from "react";
import UserRequest from "../api/pathbook/requests/auth/UserRequest.ts";
import type { User } from "../api/pathbook/types/User";
import { parseCookies } from "../scripts/cookie.ts";
import "./MyPage.css";
import {
  UpdateProfileRequest,
  UploadProfileImageRequest,
} from "../api/pathbook/requests/auth/MyPageRequest";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [userId, setUserId] = useState("");

  const [showBgModal, setShowBgModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("선택된 파일 없음");

  const [tabData, setTabData] = useState<any[]>([]);
  const [tabLoading, setTabLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // 유저 정보 로드
  useEffect(() => {
    const fetchUser = async () => {
      const cookies = parseCookies(document.cookie);
      const loggedIn = cookies.get("logged_in");

      if (!loggedIn) {
        setCurrentUser(null);
        return;
      }

      try {
        const userRequest = new UserRequest();
        const userResponse = await userRequest.send();
        const user = userResponse.user;

        setCurrentUser(user);
        setNickname(user.username);
        setBio("바이오정보");
        setBgImage("이미지정보");
        setProfileImage("이미지정보");
        setUserId(user.id);
      } catch (error) {
        console.error("유저 정보 로딩 실패:", error);
      }
    };

    fetchUser();
  }, []);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "background" | "profile" //이거 수정해야함 
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      try {
        const res = await new UploadProfileImageRequest(file, type).send();
        if (type === "background") {
          setBgImage(res.url);
          setShowBgModal(false);
        } else {
          setProfileImage(res.url);
          setShowProfileModal(false);
        }
      } catch {
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  const handleEditSave = async () => {
    try {
      await new UpdateProfileRequest(nickname, bio).send();
      setIsEditing(false);
      alert("프로필이 저장되었습니다.");
    } catch {
      alert("프로필 저장에 실패했습니다.");
    }
  };

  const renderModal = (type: string) => (
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
    if (tabLoading) return <EmptyContent label="불러오는 중..." />;
    if (!tabData || tabData.length === 0) return <EmptyContent label="데이터 없음" />;
    return (
      <div className="mypage-content">
        <ul>
          {tabData.map((item, idx) => (
            <li key={idx}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>
    );
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
        <div className="profile-left">
          <div
            className="profile-image"
            style={{
              backgroundImage: `url(${profileImage})`,
              backgroundSize: "cover",
            }}
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
                  {nickname} <span>{userId}</span>
                </h2>
                <p>{bio}</p>
              </>
            )}
          </div>
        </div>

        <div className="profile-buttons">
          <button
            className="edit-button"
            onClick={() => {
              if (isEditing) handleEditSave();
              else setIsEditing(true);
            }}
          >
            {isEditing ? "저장" : "프로필 편집하기"}
          </button>
        </div>
      </div>

      <div className="mypage-tabmenu">
        {["posts", "comments", "likes", "bookmarks"].map((tab) => (
          <div
            key={tab}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
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
};

const EmptyContent = ({ label }: { label: string }) => (
  <div className="mypage-content">
    <div className="content-area">{label}</div>
  </div>
);

export default MyPage;
