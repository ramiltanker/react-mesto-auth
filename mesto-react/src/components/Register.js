import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register(props) {
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.handleRegister(email, password);        
        setPassword('');
        setEmail('');
    }

    return (
        <>
         <div className="register">
           <h2 className="register__title">Регистрация</h2>
           <form className="register__form" onSubmit={handleSubmit}>
           <input className="register__input" required id="mail" name="mail" type="email" placeholder="Email" minLength="5" 
           maxLength="40" onChange={(event) => setEmail(event.target.value)} />
           <input className="register__input" required id="password" name="password" type="password" placeholder="Пароль" minLength="6"
            maxLength="16" onChange={(event) => setPassword(event.target.value)} />
           <button type="submit" className="register__button" onSubmit={handleSubmit}>Зарегистрироваться</button>
           </form>
           <div className="register__signin">
            <p>Уже зарегистрированы?</p>
            <Link to="sign-in" className="register__login-link">Войти</Link>
           </div>
         </div>
        </>
    )
}

export default withRouter(Register);