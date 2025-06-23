import { useRef, useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMismatch, setShowMismatch] = useState(false);
  const [lengthCheck, setLengthCheck] = useState(false);
  const [upperCheck, setUpperCheck] = useState(false);
  const [lowerCheck, setLowerCheck] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);
  const [specialCheck, setSpecialCheck] = useState(false);
  const confirmRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setLengthCheck(value.length >= 8);
    setUpperCheck(/[A-Z]/.test(value));
    setLowerCheck(/[a-z]/.test(value));
    setNumberCheck(/[0-9]/.test(value));
    setSpecialCheck(/[^A-Za-z0-9]/.test(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !(lengthCheck && upperCheck && lowerCheck && numberCheck && specialCheck)
    ) {
      alert("비밀번호 형식이 올바르지 않습니다!");
      return;
    }
    if (password !== confirmPassword) {
      setShowMismatch(true);
      if (confirmRef.current) {
        confirmRef.current.classList.add("shake");
        confirmRef.current.addEventListener("animationend", function handler() {
          confirmRef.current?.classList.remove("shake");
          confirmRef.current?.removeEventListener("animationend", handler);
        });
      }
    } else {
      setShowMismatch(false);
      console.log("비밀번호 재설정 요청됨. (reset)");
      // TODO: 여기에 API 연결하여 비밀번호 재설정 요청 처리하면 됨.
    }
  };

  return (
    <>
      <div className="auth reset-password">
        <div className="auth-container">
          <div className="auth-title">비밀번호 재설정</div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-section">
              <label htmlFor="password">비밀번호</label>
              <input
                className="input input-password"
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="password-guide">
                <p
                  className={
                    lengthCheck ? "constraint-satisfied" : "constraint"
                  }
                >
                  {lengthCheck ? "•" : "❌"} 최소 8자 이상
                </p>
                <p
                  className={upperCheck ? "constraint-satisfied" : "constraint"}
                >
                  {upperCheck ? "•" : "❌"} 영어 대문자 포함
                </p>
                <p
                  className={lowerCheck ? "constraint-satisfied" : "constraint"}
                >
                  {lowerCheck ? "•" : "❌"} 영어 소문자 포함
                </p>
                <p
                  className={
                    numberCheck ? "constraint-satisfied" : "constraint"
                  }
                >
                  {numberCheck ? "•" : "❌"} 숫자(0-9) 포함
                </p>
                <p
                  className={
                    specialCheck ? "constraint-satisfied" : "constraint"
                  }
                >
                  {specialCheck ? "•" : "❌"} 특수문자 1자 이상 포함
                </p>
              </div>
            </div>
            <div className="auth-form-section">
              <label htmlFor="confirm-password">비밀번호 재입력</label>
              <input
                className="input input-confirm-password"
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="비밀번호를 다시 입력하세요"
                required
                ref={confirmRef}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {showMismatch && (
                <div className="password-mismatch">
                  입력한 비밀번호가 다릅니다.
                </div>
              )}
            </div>
            <button type="submit" className="auth-form-submit">
              비밀번호 재설정
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
