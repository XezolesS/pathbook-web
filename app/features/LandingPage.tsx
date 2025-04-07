import './LandingPageStyle.css'
import Details from './Details' 
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

      <div className='landing-details-container'>
        <div className='details-container'>
          <Details />
        </div>
      </div>

      <div className='footer-container'>
        footer
      </div>
    </>
  )
}
