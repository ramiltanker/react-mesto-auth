import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/api.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';


function App() {

const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);


const [currentUser, setCurrentUser] = React.useState({});
const [cards, setCards] = React.useState([]);

React.useEffect(() => {
   api.getUserInfo()
 .then((data) => {
   setCurrentUser(data);
 })

 api.getInitialCards()
 .then((data) => {
  setCards(data);
  console.log(data);
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
})
.catch((error) => {
  console.log(error);
})
}

function handleUpdateAvatar(data) {
  api.setAvatar(data.avatar)
  .then((newAvatar) => {
    setCurrentUser(newAvatar);
  })
  .catch((error) => {
    console.log(error);
  })
}


function handleAddPlaceSubmit(data) {
  api.addNewCards(data)
  .then((newCard) => {
    setCards([newCard, ...cards]);
  })
  .catch((error) => {
    console.log(error);
  })
}

  return (
<CurrentUserContext.Provider value={currentUser}>
<Header />


<Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} 
onCardClick={handleCardClick} likeCard={handleCardLike} deleteCard={handleCardDelete} cards={cards} 
 />


 <Footer />

 <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 

 <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 

 <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
 



<PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups} buttonName="Да" />

<ImagePopup name="image" card={selectedCard} onClose={closeAllPopups} />

</CurrentUserContext.Provider> 

  );
}

export default App;
