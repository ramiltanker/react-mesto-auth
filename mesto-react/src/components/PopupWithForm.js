import closeImage from '../images/Close_Icon.svg';
import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup ${props.isOpen ? "popup_opened" : " "}`} id={`popup-${props.name}`}>
        <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
          <form onSubmit={props.onSubmit} method="post" name="popup-profile-form" className="popup__form" id={`popup-${props.name}-form`}>
            <fieldset className="popup__form-set">
            {props.children}
            <button className="popup__button-save popup__button-submit" type="submit">{props.buttonName}</button>
            </fieldset>
          </form>
          <button className="popup__close-button" type="reset" onClick={props.onClose}>
        <img src={closeImage} className="popup__close-image" alt="Закрыть" />
      </button>
        </div>
      </div> 
    )

}

export default PopupWithForm;