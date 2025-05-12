import LogoutRequest from "../api/pathbook/requests/auth/LogoutRequest";
import { User } from "../api/pathbook/types/User";
import edit_svg from "../assets/edit.svg";
import "./MainPageStyle.css";

interface UserProfileComponentProps {
  user: User;
}

export default function UserProfileComponent({
  user,
}: UserProfileComponentProps) {
  const handleLogoutClick = async () => {
    try {
      const logoutRequest = new LogoutRequest();
      await logoutRequest.send();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="profile">
        <div className="profile-image"></div>
        <div className="profile-info">
          <div className="profile-name">
            <span>{user.username}</span>
            <img className="edit" src={edit_svg}></img>
          </div>
          <div className="profile-id">{user.id}</div>
          <div className="profile-bio">
            <span>바이오/자기소개</span>
            <img className="edit" src={edit_svg}></img>
          </div>
          <div className="profile-options">
            <a href="">내 정보 수정</a>
            <a href="" onClick={handleLogoutClick}>로그아웃</a>
          </div>
        </div>
      </div>
    </>
  );
}
