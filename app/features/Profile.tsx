
import './MainPageStyle.css'
import edit_svg from './assets/edit.svg'

export default function Main() {
  return (
    <>
    
    <div className='profile'>
            <div className='profile-image'></div>
            <div className='profile-info'>
              <div className='profile-name'>
                <span>닉네임</span>
                <img className='edit' src={edit_svg}></img>
              </div>
              <div className='profile-id'>@nickname</div>
              <div className='profile-bio'>
                <span>바이오/자기소개</span>
                <img className='edit' src={edit_svg}></img>
              </div>
              <div className='profile-options'><a href=''>내 정보 수정</a> <a href=''>로그아웃</a></div>
            </div>
          </div>

    
    </>
  )
}
