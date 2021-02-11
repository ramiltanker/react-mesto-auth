import logo from '../images/header_logo.svg';
import { Route, NavLink } from 'react-router-dom'
import React from 'react';

function Header() {

  const loginNavBar = (
    <nav>
      <Route path="/sign-up">
        <NavLink className="header__link" to="/sign-in">Войти</NavLink>
      </Route>
      <Route path="/sign-in">
        <NavLink className="header__link" to="/sign-up">Регистрация</NavLink>
      </Route>
    </nav>
  )

    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Лого" />
        {loginNavBar}
      </header>
    )
}

export default Header;