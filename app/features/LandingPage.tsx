import './LandingPageStyle.css'

export default function LandingPage() {
  return (
    <>
      <div className='Landing_Main_Container'>
        <div className='Landing_Container'>
          <div className='Info' id='background_color_gray'>
            Info
          </div>

          <div className='Landing_Container_Right'>
            <div className='Login_button' id="background_color_gray">
              Login_button
            </div>
            
            <div className='Landing_Contents_Viewer' id="background_color_gray">
              Landing_Contents_Viewer
            </div>
          </div>
        </div>
      </div>

      <div className='Landing_Info_Container'>
        <div className='Info_Container' id='background_color_gray'>
          Info_Container
        </div>
      </div>

      <div className='footer_Container'>
        footer
      </div>
    </>
  )
}
