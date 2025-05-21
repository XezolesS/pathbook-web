import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const handleLogoClick = () => {
    window.location.href = "/main";
  };

  const [openSections, setOpenSections] = useState({
    myInfo: true,
    myActivity: true,
    bookmarks: true,
    report: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="sidebar">
      <div
        className="sidebar-header"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <div className="sidebar-logo">Pathbook</div>
        <div className="sidebar-sublogo">모두가 만들어가는 네비게이션</div>
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-title" onClick={() => toggleSection("myInfo")}>
        내 정보 관리{" "}
        <span className="arrow-icon">{openSections.myInfo ? "▲" : "▼"}</span>
      </div>
      <ul className={`menu-list ${openSections.myInfo ? "open" : "closed"}`}>
        <li>-내 정보 수정</li>
        <li>-비밀번호 재설정</li>
        <li>-계정 내역</li>
        <li>-계정 탈퇴 신청</li>
      </ul>

      <div
        className="sidebar-title"
        onClick={() => toggleSection("myActivity")}
      >
        나의 활동{" "}
        <span className="arrow-icon">
          {openSections.myActivity ? "▲" : "▼"}
        </span>
      </div>
      <ul
        className={`menu-list ${openSections.myActivity ? "open" : "closed"}`}
      >
        <li>
          -좋아요 <span className="new-badge">N</span>
        </li>
        <li>
          -내가 쓴 게시글 <span className="new-badge">N</span>
        </li>
        <li>
          -내가 쓴 댓글 <span className="new-badge">N</span>
        </li>
      </ul>

      <div className="sidebar-title" onClick={() => toggleSection("bookmarks")}>
        북 마크 관리{" "}
        <span className="arrow-icon">{openSections.bookmarks ? "▲" : "▼"}</span>
      </div>
      <ul className={`menu-list ${openSections.bookmarks ? "open" : "closed"}`}>
        <li>
          -북 마크 <span className="new-badge">N</span>
        </li>
      </ul>

      <div className="sidebar-title" onClick={() => toggleSection("report")}>
        신고하기{" "}
        <span className="arrow-icon">{openSections.report ? "▲" : "▼"}</span>
      </div>
      <ul className={`menu-list ${openSections.report ? "open" : "closed"}`}>
        <li>-신고</li>
        <li>-신고현황</li>
      </ul>
    </aside>
  );
}
