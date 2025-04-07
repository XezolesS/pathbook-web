import './LandingPageStyle.css'
import Info from './Info'

export default function LandingPage() {
  return (
    <>
      <div className='landing-main-container'>
        <div className='landing-container'>
          <div className='info'>
            <Info />
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
