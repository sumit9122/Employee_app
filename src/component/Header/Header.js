import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo.PNG'

const Header = () => {
  const navigation = useNavigate();
  const token = window.localStorage.getItem("token");
  const logout = () => {
    window.localStorage.clear('token');
    setTimeout(() => {
      navigation('/login');
    }, 1000)
  }
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
            <button className='log_button' onClick={logout}>LogOut</button>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header;