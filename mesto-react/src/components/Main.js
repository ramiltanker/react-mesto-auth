import React from 'react';

import avatarRedact from '../images/avatar-redact.svg';
import editButtom from '../images/edit_button.svg';
import addButton from '../images/add-button.svg';

import Card from './Card.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);
  
  const [avatarImage, setAvatarImage] = React.useState(false)

 function visibleAvatarRedactImage() {
  setAvatarImage(true);
  }

 function hideAvatarRedactImage() {
  setAvatarImage(false);
  }

 
    return (
        <>
        <section className="profile">
    <div className="profile__avatar-container" onClick={props.onEditAvatar}  onMouseEnter={visibleAvatarRedactImage}
    onMouseLeave={hideAvatarRedactImage}>
      <img src={avatarRedact} className={`profile__avatar-redact-image ${avatarImage ? 'profile__avatar-redact-image_visible' : ''}`} 
      alt="Редактировать" />
      <div className="profile__avatar-redaction">
        <img src={currentUser.avatar} className="profile__image" alt="Аватарка" />
      </div>
    </div>
    <div className="profile__info">
      <h1 className="profile__name">{currentUser.name}</h1>
      <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
        <img alt="Редактировать" src={editButtom} />
      </button>
    <p className="profile__profession">{currentUser.about}</p>
    </div>
    <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
      <img alt="Добавить" src={addButton} />
    </button>
  </section>
  
  <section className="elements">
    {props.cards.map( data => (
      <Card key={data._id} card={data} onCardClick={props.onCardClick} onLikeClick={props.likeCard} 
      onDeleteClick={props.deleteCard} />
    )
    )}
  </section>
  </>
    )

}

export default Main;