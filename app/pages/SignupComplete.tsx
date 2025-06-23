import React, { useRef, useState, useEffect } from "react";
import "./SignupComplete.css";

export default function SignupComplete() {
  const [redirect, setRedirect] = useState(false);
  const [cardScale, setCardScale] = useState(1);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) setCardScale(0.9);
      else if (width > 1200) setCardScale(1.1);
      else setCardScale(1);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="signup-complete-wrapper">
      <div
        className="signup-complete-box"
        style={{ transform: `scale(${cardScale})`, transition: "transform 0.3s" }}
      >
        <div className="signup-complete-title">회원가입 완료</div>
        <div className="signup-complete-message">
          Pathbook에 오신 것을 환영합니다.<br />
          로그인 후 다양한 서비스를 이용해보세요!
        </div>
        <button
          className="signup-complete-btn"
          ref={buttonRef}
          onClick={handleButtonClick}
        >
          로그인하러 가기
        </button>
      </div>
    </div>
  );
}
