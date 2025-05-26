import React, { useState } from "react";
import "./ReportPage.css";

const sampleReports = [
  // { id: 1, type: "user", target: "닉네임", reason: "욕설", content: "심한 욕설", date: "2025-05-24", status: "접수" },
];

const REPORT_REASONS = [
  "정치/종교적 게시물",
  "특정 유저 언급(저격) 게시물",
  "폭력성(욕설, 비방) 게시물",
  "기타",
];

const ReportPage = () => {
  const [reports, setReports] = useState(sampleReports);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  const handleUserReport = (report) => {
    setReports((prev) => [
      { ...report, type: "user", id: prev.length + 1, date: new Date().toISOString().slice(0, 10), status: "접수" },
      ...prev,
    ]);
    setShowUserModal(false);
  };

  const handlePostReport = (report) => {
    setReports((prev) => [
      { ...report, type: "post", id: prev.length + 1, date: new Date().toISOString().slice(0, 10), status: "접수" },
      ...prev,
    ]);
    setShowPostModal(false);
  };

  return (
    <div className="reportpage-container">
      <div className="reportpage-header">
        <h2>신고 내역</h2>
        <div className="report-buttons">
          <button onClick={() => setShowUserModal(true)}>유저 신고</button>
          <button onClick={() => setShowPostModal(true)}>글 신고</button>
        </div>
      </div>

      <div className="report-list">
        {reports.length === 0 ? (
          <EmptyContent label="신고 내역이 없습니다." />
        ) : (
          reports.map((r) => (
            <div className="report-item" key={r.id}>
              <div className="report-type">{r.type === "user" ? "유저 신고" : "글 신고"}</div>
              <div className="report-target">대상: {r.target}</div>
              <div className="report-reason">사유: {r.reason}</div>
              <div className="report-content">내용: {r.content}</div>
              <div className="report-date">{r.date}</div>
              <div className="report-status">{r.status}</div>
            </div>
          ))
        )}
      </div>

      {showUserModal && (
        <UserReportModal
          onClose={() => setShowUserModal(false)}
          onSubmit={handleUserReport}
        />
      )}
      {showPostModal && (
        <PostReportModal
          onClose={() => setShowPostModal(false)}
          onSubmit={handlePostReport}
        />
      )}
    </div>
  );
};

// 유저 신고 모달
export const UserReportModal = ({ onClose, onSubmit }) => {
  const [nickname, setNickname] = useState("");
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [content, setContent] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>유저 신고하기</h3>
        <div className="modal-form">
          <label>
            신고할 유저 닉네임
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="유저 닉네임 입력"
            />
          </label>
          <label>
            신고 사유
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              {REPORT_REASONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label>
            상세 내용
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="신고 사유를 구체적으로 적어주세요"
            />
          </label>
        </div>
        <div className="modal-buttons">
          <button
            onClick={() => {
              if (!nickname || !content) {
                alert("닉네임과 내용을 입력해주세요.");
                return;
              }
              onSubmit({ target: nickname, reason, content });
            }}
          >
            신고하기
          </button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

// 글 신고 모달
export const PostReportModal = ({ onClose, onSubmit }) => {
  const [postTitle, setPostTitle] = useState("");
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [content, setContent] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>글 신고하기</h3>
        <div className="modal-form">
          <label>
            신고할 글 제목/ID
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="글 제목 또는 ID 입력"
            />
          </label>
          <label>
            신고 사유
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              {REPORT_REASONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label>
            상세 내용
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="신고 사유를 구체적으로 적어주세요"
            />
          </label>
        </div>
        <div className="modal-buttons">
          <button
            onClick={() => {
              if (!postTitle || !content) {
                alert("글 제목/ID와 내용을 입력해주세요.");
                return;
              }
              onSubmit({ target: postTitle, reason, content });
            }}
          >
            신고하기
          </button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

const EmptyContent = ({ label }: { label: string }) => (
  <div className="empty-content">{label}</div>
);

export default ReportPage;
