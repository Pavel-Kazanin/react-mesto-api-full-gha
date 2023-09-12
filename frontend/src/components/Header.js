import headerLogo from "../images/logo.svg";
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, userEmail, signOut }) {

  const link = useLocation();  

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" alt="Логотип" src={headerLogo} />
        <div className="header__info">
        {loggedIn && <p className="header__user-login">{userEmail}</p>}
        {link.pathname === "/signin" 
        ?
        <Link to="signup" className="header__sign-in">Регистрация</Link>
        :
        <Link to="signin" className="header__sign-in">{loggedIn ? <button className="header__sign-out" onClick={signOut}>Выйти</button> : 'Вход'}</Link>
        }
        </div>
      </div>
    </header>
  )
}

export default Header;
