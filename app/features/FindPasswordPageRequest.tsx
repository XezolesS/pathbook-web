import './FindPasswordPageStyle.css';

export default function FindPasswordRequest() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('비밀번호 재설정 요청됨. (request)');
    // TODO: 여기에 API 연결하여 비밀번호 재설정 요청 처리하면 됨.
  };

  return (
    <>
      <div>
        <div className='logo'>PathBook</div>

        <div className='find-password'>
          <div className='find-password-container'>
            <div className='find-password-text'>비밀번호 재설정</div>
            <form className='find-password-form' onSubmit={handleSubmit}>
              <div className='find-password-description'>
                가입한 이메일을 입력하시고 ‘비밀번호 재설정’ 버튼을 누르시면 입력한 이메일 주소로 비밀번호 재설정 링크가 전송됩니다.
                <br /><br />
                전송된 링크에 접속하여 비밀번호를 재설정 해주세요.
                <br /><br />
              </div>

              <label htmlFor='email'>이메일</label>
              <div className='find-password-form-section'>
                <input
                  className='input input-email'
                  type='email'
                  id='email'
                  name='email'
                  placeholder='이메일을 입력하세요'
                  required
                />
              </div>

              <button type='submit' className='find-password-submit'>
                비밀번호 재설정
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
