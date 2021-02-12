import React, { } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

    const avatarRef = React.useRef('');

    React.useEffect(() => {
        avatarRef.current.value = '';
    })

    function handleSubmit(e) {
        e.preventDefault();
        console.log(avatarRef);
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      } 

    return (

<PopupWithForm name="avatar" title="Обновить аватар" buttonName="Сохранить" isOpen={props.isOpen} onClose={props.onClose} 
 onSubmit={handleSubmit} children = {
    <label className="popup__form-field">
    <input ref={avatarRef}  id="avatar-input" type="url" className="popup__form-input popup__avatar" name="link" required placeholder="Ссылка на аватар" />
    <span className="popup__form-input-error " id="avatar-input-error" />
  </label>
 } />

    )
}

export default EditAvatarPopup;