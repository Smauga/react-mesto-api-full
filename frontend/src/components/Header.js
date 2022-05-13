import { useState, useRef } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import logo from "../images/header-logo.svg";
import headerOpen from "../images/header-open.svg";
import headerClose from "../images/header-close.svg";

function Header({ email, signOut }) {

  const menuRef = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    if (!isMenuOpen) {
      menuRef.current.src = headerOpen;
      setIsMenuOpen(true);
    }
    else {
      menuRef.current.src = headerClose;
      setIsMenuOpen(false);
    }
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Switch>
        <Route path='/sign-in'>
          <Link to="sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path='/sign-up'>
          <Link to="sign-in" className="header__link">Войти</Link>
        </Route>
        <Route path='/'>
          <img ref={menuRef} src={headerClose} alt="Меню" className="header__menu" onClick={handleMenuClick} />
          <div className={isMenuOpen ? "header__container header__container_active" : "header__container"}>
            <p className="header__email">{email}</p>
            <button className="header__out" onClick={signOut}>Выйти</button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
