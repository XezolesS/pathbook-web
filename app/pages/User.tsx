import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GetBannerRequest from "../api/pathbook/requests/user/GetBannerRequest";
import GetIconRequest from "../api/pathbook/requests/user/GetIconRequest";
import UserRequest from "../api/pathbook/requests/user/UserRequest";
import type { User } from "../api/pathbook/types/User";
import type { Post } from "../api/pathbook/types/Post";
import type { Comment } from "../api/pathbook/types/Comment";
import PathGroupomponent from "../components/PathGroup";
import type { Route } from "./pages/+types/User";
import "./User.css";

export async function loader({ request, params }: Route.LoaderArgs) {
  return { userId: params.userid };
}

export default function UserPage({ loaderData }: Route.ComponentProps) {
  const { userId } = loaderData;

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("닉네임");
  const [bio, setBio] = useState("바이오 / 상태 메시지");
  const [banner, setBanner] = useState("/app/assets/image/samplepic1_a.jpg");
  const [icon, setIcon] = useState("/app/assets/image/samplepic2.jpg");

  const [showBgModal, setShowBgModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("선택된 파일 없음");

  const [user, setUser] = useState<User | null>(null);

  // --- 추가: 게시글, 댓글, 좋아요 상태 및 로딩 상태
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [userLikes, setUserLikes] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [likesLoading, setLikesLoading] = useState(false);

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRequest = new UserRequest(userId);
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
    const blob2Url = (blob: Blob) => URL.createObjectURL(blob);

    const fetchIcon = async () => {
      try {
        const getIconRequest = new GetIconRequest(userId);
        const getIconResponse = await getIconRequest.send();

        setIcon(blob2Url(getIconResponse.image));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBanner = async () => {
      try {
        const getBannerRequest = new GetBannerRequest(userId);
        const getBannerResponse = await getBannerRequest.send();

        setBanner(blob2Url(getBannerResponse.image));
      } catch (error) {
        console.error(error);
      }
    };

    if (user === null) return;

    setUsername(user.username);
    fetchIcon();
    fetchBanner();
  }, [user]);

  //  작성글, 댓글, 좋아요 데이터 불러오기
  useEffect(() => {
    if (!userId) return;

    const fetchUserPosts = async () => {
      setPostsLoading(true);
      try {
        const res = await fetch(`/post/list?userId=${userId}`);
        const data = await res.json();
        setUserPosts(data);
      } catch (e) {
        console.error("유저 게시글 불러오기 실패:", e);
      }
      setPostsLoading(false);
    };

    const fetchUserComments = async () => {
      setCommentsLoading(true);
      try {
        const res = await fetch(`/comment/list?userId=${userId}`);
        const data = await res.json();
        setUserComments(data);
      } catch (e) {
        console.error("유저 댓글 불러오기 실패:", e);
      }
      setCommentsLoading(false);
    };

    const fetchUserLikes = async () => {
      setLikesLoading(true);
      try {
        const res = await fetch(`/post/liked?userId=${userId}`);
        const data = await res.json();
        setUserLikes(data);
      } catch (e) {
        console.error("유저 좋아요 불러오기 실패:", e);
      }
      setLikesLoading(false);
    };

    fetchUserPosts();
    fetchUserComments();
    fetchUserLikes();
  }, [userId]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "background" | "profile"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (type === "background") {
          setBanner(fileReader.result as string);
          setShowBgModal(false);
        } else {
          setIcon(fileReader.result as string);
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
        return (
          <EmptyContent label="작성글">
            {postsLoading ? (
              <div>로딩중...</div>
            ) : userPosts.length === 0 ? (
              <div>작성한 게시글이 없습니다.</div>
            ) : (
              userPosts.map((post) => (
                <div
                  key={post.id}
                  className="user-post-item"
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  <h3>{post.title}</h3>
                  <p>{post.content.slice(0, 100)}...</p>
                  <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
              ))
            )}
          </EmptyContent>
        );
      case "comments":
        return (
          <EmptyContent label="작성 댓글">
            {commentsLoading ? (
              <div>로딩중...</div>
            ) : userComments.length === 0 ? (
              <div>작성한 댓글이 없습니다.</div>
            ) : (
              userComments.map((comment) => (
                <div key={comment.commentId} className="user-comment-item">
                  <div>
                    <b>{comment.content.slice(0, 50)}</b>
                  </div>
                  <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
                </div>
              ))
            )}
          </EmptyContent>
        );
      case "likes":
        return (
          <EmptyContent label="좋아요">
            {likesLoading ? (
              <div>로딩중...</div>
            ) : userLikes.length === 0 ? (
              <div>좋아요한 게시글이 없습니다.</div>
            ) : (
              userLikes.map((post) => (
                <div
                  key={post.id}
                  className="user-like-item"
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  <h3>{post.title}</h3>
                  <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
              ))
            )}
          </EmptyContent>
        );
      case "pathbooks":
        return (
          <EmptyContent label="패스북">
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
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </>
            ) : (
              <>
                <h2>
                  {username} <span>{userId}</span>
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
    <h3>{label}</h3>
    <div className="content-area">{children}</div>
  </div>
);