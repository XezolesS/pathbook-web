import './LoginStyle.css';

export default function Login() {
  return (
    <>
      <div className='logo'>PathBook</div>
      <div className='login'>
        <div className='login-container'>
          <div className='login-text'>로그인</div>
          <form className='login-form' action='/login' method='post'>
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
            />
            <br />
            <label className='logged-checkbox' htmlFor='keep-logged'>
              <input 
                type='checkbox' 
                id='keep-logged' 
                name='keepLogged' 
              />
              로그인 상태 유지
            </label>
            <br />
            <button type='submit' className='login-form-submit'>로그인</button>
          </form>
        </div>
      </div>
      
      <div className='other-menu-container'>
        <a href='/register'>회원가입</a>
        <div style={{ width: '3rem', height: 'auto' }}></div>
        <a href='#'>비밀번호를 잊어버렸어요</a>
      </div>
    </>
  )
}
  