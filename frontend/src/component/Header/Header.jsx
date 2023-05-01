import React, { useState } from 'react'
import Button from '../Button/Button'
import './Header.css'
import Logo from '../../assets/logo.svg'

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <header className='header'>
      <div className="header__logo">
        <img src={Logo} alt="" />
      </div>
      <div className="header__menu">
        <nav>
          <ul>
            <li>blog</li>
            <li>library</li>
          </ul>
        </nav>
      </div>
      <div className="header__button-container">
        <Button 
          title='donate'
          btnClass='border'
        />
      </div>
    </header>
  )
}

export default Header