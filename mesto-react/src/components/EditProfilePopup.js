import React, { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup(props) {

    

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = useState('');



    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name: name,
          about: description,
        });

        props.onClose();
      } 
      


      React.useEffect(() => {
        setName(currentUser.name || '')
        setDescription(currentUser.about || '');
      }, [currentUser]);



    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }


    return (
        <PopupWithForm name="profile" title="Редактировать профиль" buttonName="Сохранить" isOpen={props.isOpen} 
        onClose={props.onClose} onSubmit={handleSubmit} children = {
           <>
          <label className="popup__form-field">
          <input id="name-input" type="text" className=" popup__form-input popup__form-name" value={name} name="name" required minLength={2} 
          maxLength={42} onChange={handleNameChange} />
          <span className="popup__form-input-error " id="name-input-error" />
        </label>
        <label className="popup__form-field">
          <input id="job-input" type="text" className="popup__form-input popup__form-job" value={description} name="about" required minLength={2} 
          maxLength={200} onChange={handleDescriptionChange} />
          <span className="popup__form-input-error " id="job-input-error" />
        </label>
        </>
         } />
    )
}

export default EditProfilePopup;