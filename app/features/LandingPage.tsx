import './LandingPageStyle.css'
import Details from './Details' 
import LandingContentsViewer from './LandingContentsViewer'
import Welcome from './Welcome'

export default function LandingPage() {
  return (
    <>
      <div className='landing-main-container'>
        <div className='landing-container'>
          <div className='welcome'>
            <Welcome />
          </div>

          <div className='landing-container-right'>
            <div className='login-button' 
              style={{ background: '#ffc400', borderRadius: 12,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}
            >
              <a href='/login'
                style={{ color: 'black', fontSize: '1.5vw', fontWeight: 400 }}
              >로그인</a>
            </div>
            
            <div className='landing-contents-viewer'>
              <LandingContentsViewer />
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
