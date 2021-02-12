import logo from '../images/header_logo.svg';
import { Route, NavLink } from 'react-router-dom'
import React from 'react';

function Header(props) {

  // const [screenWidth, setScreenWidth] = React.useState();
  // const [mobile, setMobile] = React.useState();

  // function handleUpdateScreenWidth(width) {
  //   setScreenWidth(width);
  // }

  // React.useEffect(() => {
  //   setScreenWidth(window.innerWidth);
  //   window.addEventListener('resize', () => {
  //     handleUpdateScreenWidth(window.innerWidth);
  //   })
  // }, []);


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
        <button className="header__button-logout" onClick={props.loggedOut}>Выйти</button>
        </div>
      </Route>
    </nav>
  )

  // const hamburgerMenu = (
  //   <button className="header__hamburger-menu" type="button">
  //     <span className="header__hamburger-line"></span>
  //   </button>
  // )

    return (
      <>
      <header className="header">
        <img className="header__logo" src={logo} alt="Лого" />
        {loginNavBar}  
      </header>
      </>
    )
}

export default Header;

// {(screenWidth < 325 && props.loggedIn) ? hamburgerMenu : ''}      