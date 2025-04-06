import { useState, useRef } from 'react';
import './RigisterStyle.css';

export default function Register() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showMismatch, setShowMismatch] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const confirmRef = useRef<HTMLInputElement>(null);
  const validatePassword = (value: string): string => {
    if (value.length < 8) {
      return '비밀번호는 최소 8자 이상이어야 합니다.';
    }
    if (!/[A-Z]/.test(value)) {
      return '비밀번호에는 대문자가 최소 1개 이상 포함되어야 합니다.';
    }
    if (!/[a-z]/.test(value)) {
      return '비밀번호에는 소문자가 최소 1개 이상 포함되어야 합니다.';
    }
    if (!/[0-9]/.test(value)) {
      return '비밀번호에는 숫자가 최소 1개 이상 포함되어야 합니다.';
    }
    if (!/[^A-Za-z0-9]/.test(value)) {
      return '비밀번호에는 특수문자가 최소 1개 이상 포함되어야 합니다.';
    }
    return '';
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const error = validatePassword(value);
    setPasswordError(error);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordError) {
      alert('비밀번호 형식이 올바르지 않습니다!');
      return;
    }
    if (password !== confirmPassword) {
      setShowMismatch(true);
      if (confirmRef.current) {
        confirmRef.current.classList.add('shake');
        confirmRef.current.addEventListener('animationend', function handler() {
          confirmRef.current?.classList.remove('shake');
          confirmRef.current?.removeEventListener('animationend', handler);
        });
      }
    } else {
      setShowMismatch(false);
      console.log('회원가입 요청.');
      // TODO: 여기에 API 연결하여 회원가입 처리하면 됨.
    }
  };

  return (
    <>
      <div>
      <div className='logo'>PathBook</div>

      <div className='register'>
        <div className='register-container'>
          <div className='register-text'>회원가입</div>
          <form className='register-form' onSubmit={handleSubmit}>
            <label htmlFor='email'>이메일</label>
            <div className='register-form-section'>
              <input
                className='input input-email'
                type='email'
                id='email'
                name='email'
                placeholder='이메일을 입력하세요'
                required
              />
            </div>
            <div className='register-form-section'>
              <label htmlFor='password'>비밀번호</label>
              <input
                className='input input-password'
                type='password'
                id='password'
                name='password'
                placeholder='비밀번호를 입력하세요'
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <div className='password-guide'>
                • 영어 대소문자 포함<br />
                • 숫자(0-9) 포함<br />
                • 특수문자 1자 이상 포함
              </div>
              {passwordError && (
                  <div className="password-error">
                    {passwordError}
                  </div>
              )}
            </div>
            <div className='register-form-section'>
              <label htmlFor='confirm-password'>비밀번호 재입력</label>
              <input
                className='input input-confirm-password'
                type='password'
                id='confirm-password'
                name='confirmPassword'
                placeholder='비밀번호를 다시 입력하세요'
                required
                ref={confirmRef}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {showMismatch && (
                <div className='password-mismatch'>
                  입력한 비밀번호가 다릅니다.
                </div>
              )}
            </div>
            <div className='register-form-section'>
              <label htmlFor='name'>닉네임</label>
              <input
                className='input input-nickname'
                type='text'
                id='name'
                name='name'
                placeholder='닉네임을 입력하세요'
                required
              />
            </div>
            <button type='submit' className='register-form-submit'>
              회원가입
            </button>
          </form>
        </div>
      </div>

      <div className='other-menu-container'>
        계정이 있으신가요? &nbsp;
        <a href='/login'>로그인 하러가기</a>
      </div>
    </div>
    </>
  )
}
  
