import { useState } from "react";
import "./BookmarkFolder.css";

export function BookFolder({ bookType, userId, bookTitle, bgColor }: { bookType: string; userId: string; bookTitle: string; bgColor: string }) {
  return (
    <div className="basic-book">
      <div className="book-shape">
        <div className="book-line"></div>
        <div className="fixed-title">Pathbook</div>
        <div className="book-user">@{userId}</div>
        <div className={bookType} style={{ backgroundColor: bgColor }}></div>
        <div className="book-title">{bookTitle}</div>
      </div>
    </div>
  );
}


export const BookmarkEditModal = ({ showBookmarkEditModal, setShowBookmarkEditModal }: {showBookmarkEditModal: boolean; setShowBookmarkEditModal: (value: boolean) => void;}) => {
  return (
    <div className="bookmark-edit-modal-overlay">
      <div className="bookmark-edit-modal-background">
        <div className="bookmark-edit-modal-header">
          <button
            className="cancle"
            type="button"
            onClick={() => {
              setShowBookmarkEditModal(false);
            }}
          >
          완료
          </button>
          <span>북 마크 편집</span>
        </div>
        <div className="bookmark-edit-modal-content">
          ?
        </div>
      </div>
    </div>
  );
};

export default function BookmarkFolderomponent() {
  const [showBookmarkEditModal, setShowBookmarkEditModal] = useState(false);

  return (
    <>
      <div className="bookmark-folder">
        <div className="bookmark-folder-header">
          <h2>북마크 관리</h2>
          <button
            type="button"
            className="add-bookmark-button"
            onClick={() => {
              setShowBookmarkEditModal(true);
            }}
            >
            + 북마크 편집
          </button>
          {showBookmarkEditModal ? <BookmarkEditModal showBookmarkEditModal={showBookmarkEditModal} setShowBookmarkEditModal={setShowBookmarkEditModal} /> : null} 
        </div>
        <div className="bookmark-folder-content">
          <BookFolder bookType="book-type1" userId="user1" bookTitle="광주 산책 코스" bgColor="#e4fbbe"/>
          <BookFolder bookType="book-type1" userId="user2" bookTitle="등산 코스" bgColor="#bec3fb"/>
          <BookFolder bookType="book-type2" userId="user3" bookTitle="벚꽃 구경" bgColor="#fbbec8"/>
          <BookFolder bookType="book-type3" userId="user4" bookTitle="드라이브 가자가자가자고" bgColor="#bec3fb"/>
        </div>
      </div>    
    </>
  );
}