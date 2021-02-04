import logo from '../images/header_logo.svg';
import React from 'react';

function Header() {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Лого" />
      </header>
    )
}

export default Header;