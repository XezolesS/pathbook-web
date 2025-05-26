import React, { useState, useEffect } from "react";
import "./MyPage.css";
import {
  FetchProfileRequest,
  UpdateProfileRequest,
  UploadProfileImageRequest,
  FetchTabDataRequest,
} from "../api/pathbook/requests/auth/MyPageRequest";



const MyPage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [userId, setUserId] = useState(""); //아디 넣기기

  const [showBgModal, setShowBgModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("선택된 파일 없음");

  const [tabData, setTabData] = useState([]);
  const [tabLoading, setTabLoading] = useState(false);

  useEffect(() => {
    new FetchProfileRequest()
      .send()
      .then((data) => {
        setNickname(data.nickname);
        setBio(data.bio);
        setBgImage(data.bgImageUrl);
        setProfileImage(data.profileImageUrl);
        setUserId(data.userId);
      })
      .catch(() => {
        alert("프로필 정보를 불러오지 못했습니다.");
      });
  }, []);

  useEffect(() => {
    setTabLoading(true);
    new FetchTabDataRequest(activeTab)
      .send()
      .then((data) => setTabData(data))
      .catch(() => setTabData([]))
      .finally(() => setTabLoading(false));
  }, [activeTab]);

  const handleImageUpload = async (e, type) => {
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

  const renderModal = (type) => (
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
                  {nickname} <span>@{userId}</span>
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

const EmptyContent = ({ label }) => (
  <div className="mypage-content">
    <div className="content-area">{label}</div>
  </div>
);

export default MyPage;
