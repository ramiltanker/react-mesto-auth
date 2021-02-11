import React, { } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {


    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');


    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleLinkChange(event) {
        setLink(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onAddPlace({
            name: name,
            link: link
        })
        
        props.onClose();
        setName('');
        setLink('');
    }

    return (
        <PopupWithForm name="cards" title="Новое место" buttonName="Создать" isOpen={props.isOpen} onClose={props.onClose} 
        onSubmit={handleSubmit} children = {
          <>
        <label className="popup__form-field">
        <input id="title-input" value={name} onChange={handleNameChange} type="text" className=" popup__form-input popup__form-title" name="name" placeholder="Название" required minLength={2} maxLength={30} />
        <span className="popup__form-input-error " id="title-input-error" />
       </label>
       <label className="popup__form-field">
        <input id="link-input" value={link} onChange={handleLinkChange} type="url" className="popup__form-input popup__form-link" name="link" placeholder="Ссылка на картинку" required />
        <span className="popup__form-input-error " id="link-input-error" />
       </label>
       </>
        } />
    )
}

export default AddPlacePopup;