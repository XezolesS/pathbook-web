import { useEffect, useRef, useState } from "react";
import RegisterRequest from "../api/pathbook/requests/auth/RegisterRequest";
import textLogo from "../assets/textLogo.png";
import "./Register.css";

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [isValidLength, setIsValidLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [temporaryName, setTemporaryName] = useState("");

  const confirmRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // TODO: 백엔드에서 랜덤 닉네임을 불러옵니다
    setTemporaryName("user-12345");
  }, []);

  // 비밀번호 Constraints 체크
  useEffect(() => {
    setIsValidLength(8 <= password.length && password.length <= 20);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSpecialChar(/[^A-Za-z0-9]/.test(password));
  }, [password]);

  useEffect(() => {
    setIsValidPassword(
      isValidLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar
    );
  }, [isValidLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar]);

  // 비밀번호 일치성 체크
  useEffect(() => {
    setPasswordMatch(confirmPassword === password);
  }, [password, confirmPassword]);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setConfirmPassword(value);
    setConfirmPasswordTouched(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidPassword) {
      alert("비밀번호 형식이 올바르지 않습니다!");
      return;
    }

    if (password !== confirmPassword) {
      if (confirmRef.current) {
        confirmRef.current.classList.add("shake");
        confirmRef.current.addEventListener("animationend", function handler() {
          confirmRef.current?.classList.remove("shake");
          confirmRef.current?.removeEventListener("animationend", handler);
        });
      }
    } else {
      const registerRequest = new RegisterRequest(
        event.target.userid.value,
        event.target.username.value,
        event.target.email.value,
        event.target.password.value
      );

      try {
        const registerResponse = await registerRequest.send();

        console.debug(registerResponse);
      } catch (error) {
        console.error();
      }
    }
  };

  return (
    <>
      <div>
        <div className="logo">
          <a href="./#">
            <img src={textLogo}></img>
          </a>
        </div>

        <div className="register">
          <div className="register-container">
            <div className="register-text">회원가입</div>
            <form className="register-form" onSubmit={handleSubmit}>
              <label htmlFor="email">이메일</label>
              <div className="register-form-section">
                <input
                  className="input input-email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>
              <div className="register-form-section">
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
                      isValidLength ? "constraint-satisfied" : "constraint"
                    }
                  >
                    {isValidLength ? "🟢" : "🔴"} 8자 이상, 20자 미만
                  </p>
                  <p
                    className={
                      hasUppercase ? "constraint-satisfied" : "constraint"
                    }
                  >
                    {hasUppercase ? "🟢" : "🔴"} 영어 대문자 포함
                  </p>
                  <p
                    className={
                      hasLowercase ? "constraint-satisfied" : "constraint"
                    }
                  >
                    {hasLowercase ? "🟢" : "🔴"} 영어 소문자 포함
                  </p>
                  <p
                    className={
                      hasNumber ? "constraint-satisfied" : "constraint"
                    }
                  >
                    {hasNumber ? "🟢" : "🔴"} 숫자(0-9) 포함
                  </p>
                  <p
                    className={
                      hasSpecialChar ? "constraint-satisfied" : "constraint"
                    }
                  >
                    {hasSpecialChar ? "🟢" : "🔴"} 특수문자 1자 이상 포함
                  </p>
                </div>
              </div>
              <div className="register-form-section">
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
                  onChange={handleConfirmPasswordChange}
                />
                {confirmPasswordTouched && !passwordMatch && (
                  <div className="password-mismatch">
                    입력한 비밀번호가 일치하지 않습니다.
                  </div>
                )}
              </div>
              <div className="register-form-section">
                <label htmlFor="userid">아이디</label>
                <input
                  className="input input-userid"
                  type="text"
                  id="userid"
                  name="userid"
                  placeholder="아이디를 입력하세요"
                  required
                  defaultValue={"@" + temporaryName}
                />
              </div>
              <div className="register-form-section">
                <label htmlFor="username">닉네임</label>
                <input
                  className="input input-username"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="닉네임을 입력하세요"
                  required
                  defaultValue={temporaryName}
                />
              </div>
              <button
                type="submit"
                className="register-form-submit"
                disabled={isValidPassword && passwordMatch ? false : true}
              >
                회원가입
              </button>
            </form>
          </div>
        </div>

        <div className="other-menu-container">
          계정이 있으신가요? &nbsp;
          <a href="/login">로그인 하러가기</a>
        </div>
      </div>
    </>
  );
}
