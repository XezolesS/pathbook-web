import { useState } from "react";
import { createPortal } from "react-dom";
import { HexColorPicker } from "react-colorful";

import delete_icon from "../assets/delete.svg";
import "./PathGroup.css";

export function PathGroupComponent({ 
  bookType, userId, bookTitle="제목", bgColor="var(--color-primary)", isDelete=false }: 
  { bookType: string; userId: string; bookTitle?: string; bgColor?: string; isDelete?: boolean;}) {
  const [showPathGroupAddModal, setShowPathGroupAddModal] = useState(false);

  return (
    <div className={'basic-book'}>
      <div className="book-shape">
        {bookType !== 'book-type-add' && isDelete &&(
          <img
            className="delete-icon"
            src={delete_icon}
            alt="Delete"
            role="button"
          />
        )}
        {bookType === "book-type-add" && (
          <div className="plus-icon" onClick={() => {
            setShowPathGroupAddModal(true);
          }}></div>
        )}
        {showPathGroupAddModal ? <PathGroupAddModal showPathGroupAddModal={showPathGroupAddModal} setShowPathGroupAddModal={setShowPathGroupAddModal} /> : null} 
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
    <div className="pathgroup-edit-modal-overlay">
      <div className="pathgroup-color-modal-background">
        <div className="pathgroup-edit-modal-header">
          <button
            className="pathgroup-edit-done"
            type="button"
            onClick={onClose}
          >
          완료
          </button>
        </div>
        <div className="pathgroup-color-modal-content">
          <HexColorPicker color={color} onChange={onChange}/>
        </div>
      </div>
    </div>
  );
}

const PathGroupEditModal = ({setShowPathGroupEditModal }: {showPathGroupEditModal: boolean; setShowPathGroupEditModal: (value: boolean) => void;}) => {
  return createPortal(
    <div className="pathgroup-edit-modal-overlay">
      <div className="pathgroup-edit-modal-background">
        <div className="pathgroup-edit-modal-header">
          <button
            className="pathgroup-edit-done"
            type="button"
            onClick={() => {
              setShowPathGroupEditModal(false);
            }}
          >
          완료
          </button>
          <span className="pathgroup-edit-title">패스북 편집</span>
        </div>
        <div className="pathgroup-edit-modal-content">
          <div className="pathgroup-edit-list">
            <PathGroupComponent bookType="book-type1" userId="user1" bookTitle="광주 산책 코스" bgColor="#e4fbbe" isDelete={true}/>
            <PathGroupComponent bookType="book-type1" userId="user2" bookTitle="등산 코스" bgColor="#bec3fb" isDelete={true}/>
            <PathGroupComponent bookType="book-type2" userId="user3" bookTitle="벚꽃 구경" bgColor="#fbbec8" isDelete={true}/>
            <PathGroupComponent bookType="book-type3" userId="user4" bookTitle="드라이브 가자가자가자고" bgColor="#bec3fb" isDelete={true}/>
            <PathGroupComponent bookType="book-type-add" userId="userID" bookTitle="" bgColor="#d9d9d9"/>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const PathGroupAddModal = ({ setShowPathGroupAddModal }: {showPathGroupAddModal: boolean; setShowPathGroupAddModal: (value: boolean) => void;}) => {
  const [showPreview, setShowPreview] = useState("book-type1");
  const [bookTitle, setBookTitle] = useState('');
  const [bgColor, setBgColor] = useState("#ffd063");
  const [showModal, setShowModal] = useState(false);

  const renderPreview = () => (
    <PathGroupComponent
      bookType={showPreview}
      bgColor={bgColor}
      userId="userID"
      bookTitle={bookTitle}
    />
  );

  return (
    <div className="pathgroup-add-modal-overlay">
      <div className="pathgroup-edit-modal-background">
        <div className="pathgroup-edit-modal-header">
          <button
            className="pathgroup-edit-done"
            type="button"
            onClick={() => {
              setShowPathGroupAddModal(false);
            }}
          >
          취소
          </button>
          <span className="pathgroup-edit-title">패스북 추가</span>
        </div>
        <div className="pathgroup-edit-modal-content">
          <div className="choose-pathgroup-design">
            <span className="pathgroup-design-label">디자인 선택</span>
            <div className="pathgroup-edit-list">
              <div
                className={`tap-type ${showPreview === "book-type1" ? "active" : ""}`}
                onClick={() => setShowPreview("book-type1")}
              > <PathGroupComponent bookType="book-type1" userId="userID"/>
              </div>
              <div
                className={`tap-type ${showPreview === "book-type2" ? "active" : ""}`}
                onClick={() => setShowPreview("book-type2")}
              > <PathGroupComponent bookType="book-type2" userId="userID"/>
              </div>
              <div
                className={`tab-type ${showPreview === "book-type3" ? "active" : ""}`}
                onClick={() => setShowPreview("book-type3")}
              > <PathGroupComponent bookType="book-type3" userId="userID"/>
              </div>
            </div>
            <span className="pathgroup-design-label">미리보기</span>
            <div className="preview-pathgroup-design">
              <div className="render-preview-pathgroup-design">
                {renderPreview()}
              </div>
              <div className="set-book-design">
                <div className="preview-pathgroup-design-label">Pathbook 제목</div>
                <input
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="pathgroup-title-input"
                  placeholder="책 제목을 입력하세요"
                />
                <div className="set-book-color">
                  <div className="preview-pathgroup-design-label">색상</div>
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
                  className="pathgroup-add-done"
                  type="button"
                  onClick={() => {
                    setShowPathGroupAddModal(false);
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

export default function PathGroupomponent() {
  const [showPathGroupEditModal, setShowPathGroupEditModal] = useState(false);

  return (
    <>
      <div className="pathgroup">
        <div className="pathgroup-header">
          <h2>패스북 관리</h2>
          <button
            type="button"
            className="add-pathgroup-button"
            onClick={() => {
              setShowPathGroupEditModal(true);
            }}
            >
            + 패스북 편집
          </button>
          {showPathGroupEditModal ? <PathGroupEditModal showPathGroupEditModal={showPathGroupEditModal} setShowPathGroupEditModal={setShowPathGroupEditModal} /> : null} 
        </div>
        <div className="pathgroup-content">
          <PathGroupComponent bookType="book-type1" userId="user1" bookTitle="광주 산책 코스" bgColor="#e4fbbe"/>
          <PathGroupComponent bookType="book-type1" userId="user2" bookTitle="등산 코스" bgColor="#bec3fb"/>
          <PathGroupComponent bookType="book-type2" userId="user3" bookTitle="벚꽃 구경" bgColor="#fbbec8"/>
          <PathGroupComponent bookType="book-type3" userId="user4" bookTitle="드라이브 가자가자가자고" bgColor="#bec3fb"/>
        </div>
      </div>    
    </>
  );
}