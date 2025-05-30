import React, { useState } from "react";
import "./User.css";
import {
  ChangeEmailRequest,
  ChangePasswordRequest,
  DeleteAccountRequest
} from "../api/pathbook/requests/auth/SettingRequest";


const Setting = () => {
  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEmailChange = async () => {
    setEmailMsg("");
    if (!email) return setEmailMsg("이메일을 입력하세요.");
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return setEmailMsg("이메일 형식이 올바르지 않습니다.");

    try {
      await new ChangeEmailRequest(email).send();
      setEmailMsg("이메일 변경 요청이 완료되었습니다.");
    } catch (err) {
      setEmailMsg(err.message || "이메일 변경 실패");
    }
  };

  const handlePasswordChange = async () => {
    setPwMsg("");
    if (!currentPassword || !newPassword || !confirmPassword) return setPwMsg("모든 항목을 입력하세요.");
    if (newPassword !== confirmPassword) return setPwMsg("새 비밀번호가 일치하지 않습니다.");
    if (newPassword.length < 6) return setPwMsg("비밀번호는 6자리 이상이어야 합니다.");

    try {
      await new ChangePasswordRequest(currentPassword, newPassword).send();
      setPwMsg("비밀번호가 변경되었습니다.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPwMsg(err.message || "비밀번호 변경 실패");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await new DeleteAccountRequest().send();
      alert("회원 탈퇴가 완료되었습니다.");
      setShowDeleteModal(false);
      window.location.href = "/main";
    } catch (err) {
      alert(err.message || "회원 탈퇴 실패");
      setShowDeleteModal(false);
    }
  };

  // 탈퇴 모달
  const renderDeleteModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>정말 탈퇴하시겠어요?</h3>
        <p>이 작업은 되돌릴 수 없습니다.</p>
        <div className="modal-button-group">
          <button
            className="modal-delete-button"
            onClick={handleDeleteAccount}
          >
            탈퇴하기
          </button>
          <button
            className="modal-cancel-button"
            onClick={() => setShowDeleteModal(false)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="setting-container">
      <h2 className="setting-title">계정 설정</h2>

      <section className="setting-section">
        <div className="setting-section-title">이메일 변경</div>
        <div>
          <input
            type="email"
            placeholder="새 이메일 입력"
            className="mypage-profile-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="edit-button" style={{ marginLeft: "10px" }} onClick={handleEmailChange}>
            변경
          </button>
        </div>
        {emailMsg && (
          <div style={{ color: emailMsg.includes("완료") ? "#4caf50" : "#e53935", marginTop: "8px" }}>
            {emailMsg}
          </div>
        )}
      </section>

      <section className="setting-section">
        <div className="setting-section-title">비밀번호 변경</div>
        <div className="setting-password-inputs">
          <input
            type="password"
            placeholder="현재 비밀번호"
            className="mypage-profile-input"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="새 비밀번호"
            className="mypage-profile-input"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            className="mypage-profile-input"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="edit-button" style={{ marginTop: "10px" }} onClick={handlePasswordChange}>
          변경
        </button>
        {pwMsg && (
          <div style={{ color: pwMsg.includes("변경되었습니다") ? "#4caf50" : "#e53935", marginTop: "8px" }}>
            {pwMsg}
          </div>
        )}
      </section>

      <section className="setting-section setting-section-delete">
        <div className="setting-section-title">회원 탈퇴</div>
        <button
          className="edit-button delete-button"
          onClick={() => setShowDeleteModal(true)}
        >
          회원 탈퇴하기
        </button>
      </section>

      {showDeleteModal && renderDeleteModal()}
    </div>
  );
};

export default Setting;
