import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';

import InfoTooltip from './InfoTooltip.js';

function Login(props) {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [status, setStatus] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    auth.authorization(email, password)
    .then(data => {
      if (data.token) {
        props.setEmail(email);
        props.handleLogin();
        history.push('/');
      }
    })
    .catch(err => {
      console.log(err);
      setOpen(true);
      handleInfoTooltipOpen(false);
    });
  }

  function handleInfoTooltipOpen(status) {
    setStatus(status);
  }

  function handleInfoTooltipClose() {
    setOpen(false);
  }

     return (
         <>
         <div className="login">
           <h2 className="login__title">Вход</h2>
           <form className="login__form" onSubmit={handleSubmit} >
           <input className="login__input" required id="email" name="email" type="email" placeholder="Email" minLength="5" 
           maxLength="40" onChange={(event) => setEmail(event.target.value)} />
           <input className="login__input" required id="password" name="password" type="password" placeholder="Пароль" minLength="1"
            maxLength="16" onChange={(event) => setPassword(event.target.value)} />
           <button type="submit" className="login__button" onSubmit={handleSubmit} >Войти</button>
           </form>
         </div>
         <InfoTooltip status={status} isOpen={open} onClose={handleInfoTooltipClose} />
         </>
     )
}

export default withRouter(Login);