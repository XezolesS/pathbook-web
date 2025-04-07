import { useState, useRef, useEffect} from 'react';
import './RegisterStyle.css';
import textLogo from './assets/textLogo.png'

export default function Register() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showMismatch, setShowMismatch] = useState(false);
  const [lengthCheck, setLengthCheck] = useState(false);
  const [upperCheck, setUpperCheck] = useState(false);
  const [lowerCheck, setLowerCheck] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);
  const [specialCheck, setSpecialCheck] = useState(false);
  const [temporaryName, setTemporaryName] = useState('');
  const confirmRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTemporaryName('user-12345'); // 추후 백엔드와 연동하여 임시 닉네임을 부여합니다.
  }, []);
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
    if (!(lengthCheck && upperCheck && lowerCheck && numberCheck && specialCheck)) {
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
      //추후 백엔드 연동 시 사용할 데이터 셋.
      /*const registerData = { 
        email: (document.getElementById('email') as HTMLInputElement).value,
        password: (document.getElementById('password') as HTMLInputElement).value,
        nickname: (document.getElementById('name') as HTMLInputElement).value,
      };*/
      // TODO: 여기에 API 연결하여 회원가입 처리하면 됨.
    }
  };

  return (
    <>
      <div>
      <div className='logo'><a href='./#'><img src={textLogo}></img></a></div>

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
                <p className={lengthCheck ? 'constraint-satisfied' : 'constraint'}>
                  {lengthCheck ? '•' : '❌'} 최소 8자 이상
                </p>
                <p className={upperCheck ? 'constraint-satisfied' : 'constraint'}>
                  {upperCheck ? '•' : '❌'} 영어 대문자 포함
                </p>
                <p className={lowerCheck ? 'constraint-satisfied' : 'constraint'}>
                  {lowerCheck ? '•' : '❌'} 영어 소문자 포함
                </p>
                <p className={numberCheck ? 'constraint-satisfied' : 'constraint'}>
                  {numberCheck ? '•' : '❌'} 숫자(0-9) 포함
                </p>
                <p className={specialCheck ? 'constraint-satisfied' : 'constraint'}>
                  {specialCheck ? '•' : '❌'} 특수문자 1자 이상 포함
                </p>
              </div>
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
                defaultValue={temporaryName}
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
  
