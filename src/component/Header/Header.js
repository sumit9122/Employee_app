import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.PNG'

const Header = () => {

  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };

  const token = window.localStorage.getItem("token");


  return (
    <header className='head'>
      <div className='container'>
        <div className='header'>
          <div className='logo'>
            <Link className='logo_text' to='/'>
              <img src={Logo} alt='' />
            </Link>
          </div>
          <div className='navigation'>
            <Link to='/Home'>Home</Link>
            {!token && <Link to='/Login'>Login</Link>}

            <Link to='/about-us'>About Us</Link>
            <Link to='/Login'>LogOut</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;