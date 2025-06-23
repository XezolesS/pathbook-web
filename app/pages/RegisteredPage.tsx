import React, { useRef, useState, useEffect } from "react";

export default function RegisteredPage() {
  const [redirect, setRedirect] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (redirect) {
      window.location.href = "/login";
    }
  }, [redirect]);

  const handleButtonClick = () => {
    if (buttonRef.current) {
      buttonRef.current.classList.add("grow-shrink");
      buttonRef.current.addEventListener("animationend", function handler() {
        buttonRef.current?.classList.remove("grow-shrink");
        buttonRef.current?.removeEventListener("animationend", handler);
        setRedirect(true);
      });
    } else {
      setRedirect(true);
    }
  };

  return (
    <>
      <div className="auth registered">
        <div className="auth-container">
          <div className="auth-title">회원가입 완료!</div>
          <div className="auth-form-section">
            Pathbook에 오신 것을 환영합니다.
            <br />
            로그인 후 다양한 서비스를 이용해보세요!
          </div>
          <button
            className="auth-form-submit"
            ref={buttonRef}
            onClick={handleButtonClick}
          >
            로그인하러 가기
          </button>
        </div>
      </div>
    </>
  );
}
