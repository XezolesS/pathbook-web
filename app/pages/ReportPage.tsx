import React, { useState, useEffect } from "react";
import "./ReportPage.css";
import ReportRequest from "../api/pathbook/requests/auth/ReportRequest"; // 상대경로 import

const REPORT_REASONS = [
  "정치/종교적 게시물",
  "특정 유저 언급(저격) 게시물",
  "폭력성(욕설, 비방) 게시물",
  "기타",
];

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/reports", { credentials: "include" });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setReports(data);
      } catch {
        alert("신고 내역을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleUserReport = async (report) => {
    try {
      const request = new ReportRequest(
        "user",
        report.target,
        report.reason,
        report.content
      );
      const saved = await request.send();
      alert("신고가 정상적으로 접수되었습니다.");
      setShowUserModal(false);
      setReports((prev) => [
        saved, 
        ...prev,
      ]);
    } catch (err) {
      alert("신고 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 글 신고 등록
  const handlePostReport = async (report) => {
    try {
      const request = new ReportRequest(
        "post",
        report.target,
        report.reason,
        report.content
      );
      const saved = await request.send();
      alert("신고가 정상적으로 접수되었습니다.");
      setShowPostModal(false);
      setReports((prev) => [
        saved,
        ...prev,
      ]);
    } catch (err) {
      alert("신고 등록에 실패했습니다. 다시 시도해주세요.");
    }
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
        {loading ? (
          <div className="empty-content">불러오는 중...</div>
        ) : reports.length === 0 ? (
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

const EmptyContent = ({ label }) => (
  <div className="empty-content">{label}</div>
);

export default ReportPage;
