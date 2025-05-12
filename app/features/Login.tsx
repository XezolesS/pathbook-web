import './LoginStyle.css';
import textLogo from '../assets/textLogo.png'

export default function Login() {
  return (
    <>
      <div className='logo'><a href='./#'><img src={textLogo}></img></a></div>
      <div className='login'>
        <div className='login-container'>
          <div className='login-text'>로그인</div>
          <form className='login-form' action='/login' method='post'>
            <div className='login-form-section'>
              <label htmlFor='email'>이메일</label>
              <input
                className='input input-email'
                type='email'
                id='email'
                name='email'
                placeholder='이메일을 입력하세요'
                required
              />
            </div>
            <div className='login-form-section'>
              <label htmlFor='password'>비밀번호</label>
              <input
                className='input input-password'
                type='password'
                id='password'
                name='password'
                placeholder='비밀번호를 입력하세요'
                required
              />
            </div>
            <label className='logged-checkbox' htmlFor='keep-logged'>
              <input 
                type='checkbox' 
                id='keep-logged' 
                name='keepLogged' 
              />
              로그인 상태 유지
            </label>
            <button type='submit' className='login-form-submit'>로그인</button>
          </form>
        </div>
      </div>
      
      <div className='other-menu-container'>
        <a href='/register'>회원가입</a>
        <a href='/reset-password-request'>비밀번호를 잊어버렸어요</a>
      </div>
    </>
  )
}
  