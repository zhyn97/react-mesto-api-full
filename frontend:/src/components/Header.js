import logo from "../images/logo.svg";
import popup_close from "../images/popup_close.svg";
import iconMenu from "../images/icon-menu.svg";
import { useLocation, Link } from "react-router-dom";
import React from "react";

function Header({signOut, email, width, closeMobileMenu, openMobileMenu, isMobileMenu}) {
  const location = useLocation();


  return (
    <header className="header">
      <img className="logo" src={logo} alt="логотип" />
      <div className="header__navigation">
        {location.pathname === "/" && width > 600 && <p className="header__text">{email}</p>}
        {location.pathname === "/sign-in" && <Link className="header__link opacity-button" to="/sign-up">Регистрация</Link>}
        {location.pathname === "/sign-up" && <Link className="header__link opacity-button" to="/sign-in">Войти</Link>}
        {location.pathname === "/" && width > 600 && <Link className="header__link opacity-button" to="/sign-in" onClick={signOut}>Выйти</Link>}
        {location.pathname === "/" && !isMobileMenu && width <= 600 && <img alt="иконка меню" onClick={openMobileMenu} className="header__icon-menu opacity-button" src={iconMenu} />}
        {location.pathname === "/" && isMobileMenu && <img onClick={closeMobileMenu} className="header__icon-menu header__icon-menu_close opacity-button" src={popup_close} alt="иконка закрытия меню" />}
      </div>
    </header>
  );
}

export default Header;
