import { useState } from "react";
import { HexColorPicker } from "react-colorful";

import delete_icon from "../assets/delete.svg";
import "./BookmarkFolder.css";

export function BookmarkFolderComponent({ 
  bookType, userId, bookTitle="제목", bgColor="var(--color-primary)", inModal=false, isAdd=false }: 
  { bookType: string; userId: string; bookTitle: string; bgColor: string; inModal?: boolean; isAdd?: boolean; }) {
  const [showBookmarkAddModal, setShowBookmarkAddModal] = useState(false);

  return (
    <div className={`basic-book ${inModal ? 'modal-version' : ''}`}>
      <div className="book-shape">
        {inModal && bookType !== 'book-type-add' && !isAdd &&(
          <img
            className="delete-icon"
            src={delete_icon}
            alt="Delete"
            role="button"
          />
        )}
        {bookType === "book-type-add" && (
          <div className="plus-icon" onClick={() => {
            setShowBookmarkAddModal(true);
          }}></div>
        )}
        {showBookmarkAddModal ? <BookmarkAddModal showBookmarkAddModal={showBookmarkAddModal} setShowBookmarkAddModal={setShowBookmarkAddModal} /> : null} 
        <div className="fixed-title">Pathbook</div>
        <div className="book-user">@{userId}</div>
        <div className={bookType} style={{ backgroundColor: bgColor }}></div>
        <div className="book-line"></div>
        <div className="book-title">{bookTitle}</div>
      </div>
    </div>
  );
}

function BookColorModal({ color, onChange, onClose }: { color: string; onChange: (color: string) => void; onClose: () => void; }) {
  return (
    <div className="bookmark-edit-modal-overlay">
      <div className="bookmark-color-modal-background">
        <div className="bookmark-edit-modal-header">
          <button
            className="bookmark-edit-done"
            type="button"
            onClick={onClose}
          >
          완료
          </button>
        </div>
        <div className="bookmark-color-modal-content">
          <HexColorPicker color={color} onChange={onChange}/>
        </div>
      </div>
    </div>
  );
}

const BookmarkEditModal = ({setShowBookmarkEditModal }: {showBookmarkEditModal: boolean; setShowBookmarkEditModal: (value: boolean) => void;}) => {
  return (
    <div className="bookmark-edit-modal-overlay">
      <div className="bookmark-edit-modal-background">
        <div className="bookmark-edit-modal-header">
          <button
            className="bookmark-edit-done"
            type="button"
            onClick={() => {
              setShowBookmarkEditModal(false);
            }}
          >
          완료
          </button>
          <span className="bookmark-edit-title">북마크 편집</span>
        </div>
        <div className="bookmark-edit-modal-content">
          <div className="bookmark-edit-list">
            <BookmarkFolderComponent bookType="book-type1" userId="user1" bookTitle="광주 산책 코스" bgColor="#e4fbbe" inModal={true}/>
            <BookmarkFolderComponent bookType="book-type1" userId="user2" bookTitle="등산 코스" bgColor="#bec3fb" inModal={true}/>
            <BookmarkFolderComponent bookType="book-type2" userId="user3" bookTitle="벚꽃 구경" bgColor="#fbbec8" inModal={true}/>
            <BookmarkFolderComponent bookType="book-type3" userId="user4" bookTitle="드라이브 가자가자가자고" bgColor="#bec3fb" inModal={true}/>

            <BookmarkFolderComponent bookType="book-type1" userId="user1" bookTitle="광주 산책 코스" bgColor="#e4fbbe" inModal={true}/>
            <BookmarkFolderComponent bookType="book-type1" userId="user2" bookTitle="등산 코스" bgColor="#bec3fb" inModal={true}/>
            <BookmarkFolderComponent bookType="book-type2" userId="user3" bookTitle="벚꽃 구경" bgColor="#fbbec8" inModal={true}/>
            <BookmarkFolderComponent bookType="book-type3" userId="user4" bookTitle="드라이브 가자가자가자고" bgColor="#bec3fb" inModal={true}/>
            
            <BookmarkFolderComponent bookType="book-type-add" userId="userID" bookTitle="" bgColor="#d9d9d9" inModal={true}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookmarkAddModal = ({ setShowBookmarkAddModal }: {showBookmarkAddModal: boolean; setShowBookmarkAddModal: (value: boolean) => void;}) => {
  const [showPreview, setShowPreview] = useState("book-type1");
  const [bookTitle, setBookTitle] = useState('');
  const [bgColor, setBgColor] = useState("#ffd063");
  const [showModal, setShowModal] = useState(false);

  const renderPreview = () => (
    <BookmarkFolderComponent
      bookType={showPreview}
      bgColor={bgColor}
      userId="userID"
      bookTitle={bookTitle}
      inModal={true}
      isAdd={true}
    />
  );

  return (
    <div className="bookmark-add-modal-overlay">
      <div className="bookmark-edit-modal-background">
        <div className="bookmark-edit-modal-header">
          <button
            className="bookmark-edit-done"
            type="button"
            onClick={() => {
              setShowBookmarkAddModal(false);
            }}
          >
          취소
          </button>
          <span className="bookmark-edit-title">북마크 추가</span>
        </div>
        <div className="bookmark-edit-modal-content">
          <div className="choose-bookmark-design">
            <span className="bookmark-design-label">디자인 선택</span>
            <div className="bookmark-edit-list">
              <div
                className={`tap-type ${showPreview === "book-type1" ? "active" : ""}`}
                onClick={() => setShowPreview("book-type1")}
              > <BookmarkFolderComponent bookType="book-type1" userId="userID" inModal={true} isAdd={true}/>
              </div>
              <div
                className={`tap-type ${showPreview === "book-type2" ? "active" : ""}`}
                onClick={() => setShowPreview("book-type2")}
              > <BookmarkFolderComponent bookType="book-type2" userId="userID" inModal={true} isAdd={true}/>
              </div>
              <div
                className={`tab-type ${showPreview === "book-type3" ? "active" : ""}`}
                onClick={() => setShowPreview("book-type3")}
              > <BookmarkFolderComponent bookType="book-type3" userId="userID" inModal={true} isAdd={true}/>
              </div>
            </div>
            <span className="bookmark-design-label">미리보기</span>
            <div className="preview-bookmark-design">
              {renderPreview()}
              <div className="set-book-design">
                <div className="bookmark-design-label">Pathbook 제목</div>
                <input
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="bookmark-title-input"
                  placeholder="책 제목을 입력하세요"
                />
                <div className="set-book-color">
                  <div className="bookmark-design-label">색상</div>
                  <button 
                    className="color-picker" 
                    style={{ backgroundColor: bgColor }}
                    onClick={() => setShowModal(true)} 
                  />
                  {showModal && (
                    <BookColorModal
                      color={bgColor}
                      onChange={setBgColor}
                      onClose={() => setShowModal(false)}
                    />
                  )}
                </div>
                <button
                  className="bookmark-add-done"
                  type="button"
                  onClick={() => {
                    setShowBookmarkAddModal(false);
                  }}
                > 완료</button>
              </div>
            </div>
          </div>
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
          <BookmarkFolderComponent bookType="book-type1" userId="user1" bookTitle="광주 산책 코스" bgColor="#e4fbbe"/>
          <BookmarkFolderComponent bookType="book-type1" userId="user2" bookTitle="등산 코스" bgColor="#bec3fb"/>
          <BookmarkFolderComponent bookType="book-type2" userId="user3" bookTitle="벚꽃 구경" bgColor="#fbbec8"/>
          <BookmarkFolderComponent bookType="book-type3" userId="user4" bookTitle="드라이브 가자가자가자고" bgColor="#bec3fb"/>
        </div>
      </div>    
    </>
  );
}