import deleteButton from '../images/deleteButton.svg';
import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements__delete-button ${isOwn ? 'elements__delete-button_visible' : 'elements__delete-button_hidden'}`
  ); 

  const isLiked = props.card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = `elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`; 

  function handleClick() {
    props.onCardClick(props.card);
  } 

  function handleLikeClick() {
    props.onLikeClick(props.card);
  }

  function handleDeleteLikeClick() {
    props.onDeleteCardLike(props.card);
  }

  function handleDeleteCard() {
    props.onDeleteClick(props.card);
  }

 

    return (
        <div className="elements__element">
        <img src={props.card.link} alt={props.card.name} className="elements__image" onClick={handleClick} />
        <h2 className="elements__title">{props.card.name}</h2>
        <button className={cardDeleteButtonClassName} onClick={handleDeleteCard}>
          <img src={deleteButton} alt="Удалить" />
        </button>
        <div className = "elements__like-group">
      <button className={cardLikeButtonClassName} onClick={isLiked ? handleDeleteLikeClick : handleLikeClick} type="button"></button>
    <span className="elements__like-score">{props.card.likes.length}</span>
        </div>
      </div>
      )
}

export default Card;