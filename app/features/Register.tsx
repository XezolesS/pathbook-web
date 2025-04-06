import { useState, useRef } from 'react';
import './RigisterStyle.css';

export default function Register() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showMismatch, setShowMismatch] = useState(false);
  const confirmRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      //여기에 API 연결하여 회원가입 처리하면 됨.
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
            <br />
            <input
              className='input-email'
              type='email'
              id='email'
              name='email'
              placeholder='이메일을 입력하세요'
              required
            />
            <br />
            <label htmlFor='password'>비밀번호</label>
            <br />
            <input
              className='input-password'
              type='password'
              id='password'
              name='password'
              placeholder='비밀번호를 입력하세요'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='password-guide'>
              • 영어 대소문자 포함<br />
              • 숫자(0-9) 포함<br />
              • 특수문자 1자 이상 포함
            </div>
            <label htmlFor='confirm-password'>비밀번호 재입력</label>
            <br />
            <input
              className='input-password'
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
            <br />
            <label htmlFor='name'>닉네임</label>
            <br />
            <input
              className='input-email'
              type='text'
              id='name'
              name='name'
              placeholder='닉네임을 입력하세요'
              required
            />
            <br />
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
  