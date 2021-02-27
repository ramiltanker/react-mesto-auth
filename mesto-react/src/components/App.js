import React from 'react';

import { Route, Switch, useHistory, Redirect, withRouter } from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api.js';
import ProtectedRoute from './ProtectedRoute.js';

import * as auth from '../utils/auth.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';


function App() {

  const history = useHistory();

const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

const [currentUser, setCurrentUser] = React.useState({});
const [cards, setCards] = React.useState([]);
  // статус пользователя — вошёл он в систему или нет
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [token, setToken] = React.useState('');

  // Хранение email пользоателя
  const [email, setEmail] = React.useState('');

  const [status, setStatus] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

React.useEffect(() => {
   api.getUserInfo(token)
 .then((data) => {
   setCurrentUser(data);
 })
 .catch((error) => {
  console.log(error);
})

 api.getInitialCards(token)
 .then((data) => {
  setCards(data);
 })
 .catch((error) => {
  console.log(error);
})
},[])





function handleEditAvatarClick()  {
    setIsEditAvatarPopupOpen(true);
}

function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
}

function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
}

function closeAllPopups() {
  setIsEditAvatarPopupOpen(false);
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setSelectedCard(false);
  setIsInfoTooltipOpen(false);
}


const [selectedCard, setSelectedCard] = React.useState(false);

function handleCardClick(openedCard) {
  setSelectedCard(openedCard);
}

function handleCardLike(card) {
  // Снова проверяем, есть ли уже лайк на этой карточке
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  // Отправляем запрос в API и получаем обновлённые данные карточки
  api.likeCard(card._id, !isLiked)
  .then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
    // Обновляем стейт
    setCards(newCards);
  })
  .catch((error) => {
    console.log(error);
  })
} 

function handleCardDelete(card) {
  api.deleteCard(card._id)
  .then(() => {
    const newCards = cards.filter((c) => c._id !== card._id);
    setCards(newCards);
  })
  .catch((error) => {
    console.log(error);
  })
}


function handleUpdateUser(data) {
api.setProfileInfo(data.name, data.about)
.then((newData) => {
setCurrentUser(newData);
closeAllPopups();
})
.catch((error) => {
  console.log(error);
})
}

function handleUpdateAvatar(data) {
  api.setAvatar(data.avatar)
  .then((newAvatar) => {
    setCurrentUser(newAvatar);
    closeAllPopups();
  })
  .catch((error) => {
    console.log(error);
  })
}


function handleAddPlaceSubmit(data) {
  api.addNewCards(data)
  .then((newCard) => {
    setCards([newCard, ...cards]);
    closeAllPopups();
  })
  .catch((error) => {
    console.log(error);
  })
}

function handleLogin(email, password) {
  setLoggedIn(true);
  auth.authorization(email, password)
  .then((res) => {
    if (res.token){
        localStorage.setItem('jwt', res.token);
        return res;
    } else {
        return;
    }
}) 
  .then(data => {
    if (data.token) {
      setEmail(email);
      history.push('/');
    }
  })
  .catch(err => {
    console.log(err);
    setIsInfoTooltipOpen(true);
    setStatus(false);
  });
}

function handleLogout() {
  setLoggedIn(false);
  setEmail(email);
  localStorage.removeItem('jwt'); 
  history.push('/sign-in');
}

function handleRegister(email, password) {
  auth.register(email, password)
  .then((res) => {
    if (res) {
  setIsInfoTooltipOpen(true);
  setStatus(true);
  history.push('/sign-in')      
    }
  })
  .catch((error) => {
    console.log(error);
    setIsInfoTooltipOpen(true);
    setStatus(false);
  })

}

function handleTokenCheck() {
const jwt = localStorage.getItem('jwt'); 
setToken(jwt);
  if (jwt) { 
    auth.checkToken(jwt)
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        setEmail(res.data.email);
        history.push('/');
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

React.useEffect(() => {
  handleTokenCheck();
}, []);

  return (
<CurrentUserContext.Provider value={currentUser}>

<Header email={email} loggedOut={handleLogout} loggedIn={loggedIn} />

<Switch>
<ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} 
onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} 
onCardClick={handleCardClick} likeCard={handleCardLike} deleteCard={handleCardDelete} cards={cards} />

<Route path="/sign-in">
  <Login handleLogin={handleLogin} setEmail={setEmail} />
</Route> 

<Route path="/sign-up">
  <Register handleRegister={handleRegister} />
</Route>  

<Route>
  {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
</Route>

</Switch>

 <Footer />

 <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} name={'profile'}/> 

 <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} name={'avatar'} /> 

 <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} name={'card'} />
 
 <InfoTooltip status={status} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} /> 

<PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups} buttonName="Да" />

<ImagePopup name="image" card={selectedCard} onClose={closeAllPopups} />

</CurrentUserContext.Provider> 
  );
}

export default withRouter(App);
