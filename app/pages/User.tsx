import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GetFileRequest from "../api/pathbook/requests/file/GetFileRequest";
import UserProfileRequest from "../api/pathbook/requests/user/UserProfileRequest";
import type { User } from "../api/pathbook/types/User";
import PathGroupomponent from "../components/PathGroup";
import type { Route } from "./pages/+types/User";
import "./User.css";
import UpdateUserProfileRequest from "../api/pathbook/requests/user/UpdateUserProfileRequest";
import UpdateUserProfileBannerRequest from "../api/pathbook/requests/user/UpdateUserProfileBannerRequest";
import UpdateUserProfileIconRequest from "../api/pathbook/requests/user/UpdateUserProfileIconRequest";

export async function loader({ request, params }: Route.LoaderArgs) {
  return { userId: params.userid };
}

export default function UserPage({ loaderData }: Route.ComponentProps) {
  const { userId } = loaderData;

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(userId);
  const [username, setUsername] = useState("닉네임");
  const [bio, setBio] = useState("바이오 / 상태 메시지");
  const [banner, setBanner] = useState("/app/assets/image/samplepic1_a.jpg");
  const [icon, setIcon] = useState("/app/assets/image/samplepic2.jpg");

  const [showBgModal, setShowBgModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("선택된 파일 없음");

  const [tabData, setTabData] = useState<any[]>([]);
  const [tabLoading, setTabLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRequest = new UserProfileRequest(userId);
        const userResponse = await userRequest.send();

        setUser(userResponse.user);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    fetchUser();
  }, []);

  // 유저 정보 설정하기
  useEffect(() => {
    if (user === null) return;

    setUsername(user.username);
    setId(user.id);
    setBio(user.bio);
    setIcon(new GetFileRequest(user.icon.filename).resolveUrl());
    setBanner(new GetFileRequest(user.banner.filename).resolveUrl());
  }, [user]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "background" | "profile"
  ) => {
    const updateBanner = async (data) => {
      try {
        const request = new UpdateUserProfileBannerRequest(data);
        const response = await request.send();
        setBanner(new GetFileRequest(response.filename).resolveUrl());
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    const updateIcon = async (data) => {
      try {
        const request = new UpdateUserProfileIconRequest(data);
        const response = await request.send();
        setIcon(new GetFileRequest(response.filename).resolveUrl());
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (type === "background") {
          updateBanner(file);
          setShowBgModal(false);
        } else {
          updateIcon(file);
          setShowProfileModal(false);
        }
        setSelectedFileName(file.name);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleEditSave = async () => {
    try {
      await new UpdateUserProfileRequest({
        id: id,
        username: username,
        bio: bio,
      }).send();
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
        return (
          <EmptyContent label="북마크">
            <PathGroupomponent />
          </EmptyContent>
        );
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
        <img src={banner} alt="배경 이미지" />
      </div>

      {showBgModal && renderModal("background")}
      {showProfileModal && renderModal("profile")}

      <div className="mypage-profile">
        <div className="profile-left">
          <div
            className="profile-image"
            style={{
              backgroundImage: `url(${icon})`,
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
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
                  {username} <span>{id}</span>
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
        {["posts", "comments", "likes", "pathbooks"].map((tab) => (
          <div
            key={tab}
            className={`tab-item cursor-pointer ${
              activeTab === tab ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "posts" && "작성글"}
            {tab === "comments" && "작성 댓글"}
            {tab === "likes" && "좋아요"}
            {tab === "pathbooks" && "패스북"}
          </div>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}

const EmptyContent = ({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) => (
  <div className="mypage-content">
    <div className="content-area">{children}</div>
  </div>
);
