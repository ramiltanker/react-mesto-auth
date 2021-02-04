import closeImage from '../images/Close_Icon.svg';
import React from 'react';

function ImagePopup(props) {
    return(
        <div className={`popup ${props.card ? "popup_opened" : " "}`} id='popup-avatar'>
        <div className="popup__container-image">
          <img src={props.card.link} className="popup__illustration-image" alt={props.card.name} />
         <h2 className="popup__title-image">{props.card.name}</h2>
          <button onClick={props.onClose} className="popup__close-button-image" type="reset">
            <img src={closeImage} className="popup__close-image" alt="Закрыть" />
          </button>
        </div>  
      </div>
    )
}

export default ImagePopup;