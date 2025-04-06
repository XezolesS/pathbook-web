import './LandingPageStyle.css'

export default function LandingPage() {
  return (
    <>
      <div className='landing-main-container'>
        <div className='landing-container'>
          <div className='info' id='background-color-gray'>
            Info
          </div>

          <div className='landing-container-right'>
            <div className='login-button' id="background-color-gray">
              <a href='/login'>로그인</a>
            </div>
            
            <div className='landing-contents-viewer' id="background-color-gray">
              Landing_Contents_Viewer
            </div>
          </div>
        </div>
      </div>

      <div className='landing-info-container'>
        <div className='info-container' id='background-color-gray'>
          Info_Container
        </div>
      </div>

      <div className='footer-container'>
        footer
      </div>
    </>
  )
}
