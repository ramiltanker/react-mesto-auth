import logo from '../images/header_logo.svg';
import { Route, NavLink } from 'react-router-dom'
import React from 'react';

function Header(props) {
  const loginNavBar = (
    <nav>
      <Route path="/sign-up">
        <NavLink className="header__link" to="/sign-in">Войти</NavLink>
      </Route>
      <Route path="/sign-in">
        <NavLink className="header__link" to="/sign-up">Регистрация</NavLink>
      </Route>
      <Route exact path="/">
        <div className="header__box">
        <p className="header__email" >{props.email}</p>
        <button className="header__button-logout" onClick={props.loggedOut} >Выйти</button>
        </div>
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