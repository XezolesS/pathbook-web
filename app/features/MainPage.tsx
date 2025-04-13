import { useEffect, useRef, useState } from 'react'
import './MainPageStyle.css'
import write_svg from './assets/write.svg'
import search_svg from './assets/search.svg'
import home_svg from './assets/home.svg'
import star_svg from './assets/star.svg'
import ring_svg from './assets/ring.svg'
import book_svg from './assets/book.svg'
import menu_svg from './assets/menu.svg'
import Profile from './Profile'

export default function Main() {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [selectedMenu, setSelectedMenu] = useState('menu_home')

  useEffect(() => {
    const handleScroll = () => {
      if (!menuRef.current) return;
      const menuHeight = menuRef.current.offsetHeight;
      const centerOffset = (window.innerHeight - menuHeight) / 2;
      menuRef.current.style.top = (window.scrollY + centerOffset) + 'px';
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <div className='mainpage'>
      <div className='main-menu-container'>
        <div className='menu-container' ref={menuRef}>
          
          <Profile />

          {[
            { name: 'menu_home', icon: home_svg, label: '===========' },
            { name: 'menu_star', icon: star_svg, label: '===========' },
            { name: 'menu_ring', icon: ring_svg, label: '===========' },
            { name: 'menu_book', icon: book_svg, label: '===========' },
            { name: 'menu_menu', icon: menu_svg, label: '===========' }
          ].map(item => (
            <div
              key={item.name}
              className={`menu_item ${selectedMenu === item.name ? 'selected' : ''}`}
              onClick={() => setSelectedMenu(item.name)}
            >
              <img className={item.name} src={item.icon} alt={item.name} />
              <span>{item.label}</span>
            </div>
          ))}

        </div>
      </div>

      <div className='main-content-container'>
        <div className='content-head'>
          <input className='search-textbox'></input>
          <img className='search-button' src={search_svg}></img>
          <img className='write-button' src={write_svg}></img>
        </div>
      </div>
    </div>
  )
}
