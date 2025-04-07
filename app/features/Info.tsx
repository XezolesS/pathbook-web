import './Info.css'

export default function Info() {
  return (
    <>
      <div className='header-container'>
        <div className="logo-image"></div>

        <div className="pathbook-title">
          <div className="title-primary">Pathbook</div>
          <div className="title-secondary">모두가 만들어가는 네비게이션</div>
        </div>
      </div>

      <div className="catchphrase">캐치프레이즈 크고 짧게</div>

      <div className="intro-section">
        <ul>
          <li>무슨 커뮤니티인지, 내가 좋아하는 경로를 지정하고 사람들과 공유할 수 있어요!!</li>
          <li>어떤 특징을 가졌는지, 단순한 장소 저장이 아닌 원하는 경로 그 자체를 저장할 수 있어요!</li>
        </ul>       
      </div>

      <div className="join-section">
        <div className="join-section-title">지금 바로 가입하고 경로를 공유해보세요</div>
        <button className="button-theme" onClick={() => window.location.href = '/Register'}>
          <div className="button-text">지금 가입하기</div>
        </button>
        <div className="guest-text">또는 익명으로 둘러보기</div>
      </div>
    </>
  )
}
