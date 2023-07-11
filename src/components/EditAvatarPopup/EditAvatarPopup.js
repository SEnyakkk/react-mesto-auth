import React from 'react';
import { PopupWithForm } from "../PopupWithForm/PopupWithForm";

export function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarRef = React.useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name={`avatar`}
      title={`Обновить аватар`}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Добавить'}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        required=""
        className="form__data form__data_user_url "
        name="avatar"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
      />
      <span className="popup__invalid popup__invalid_avatar"></span>
    </PopupWithForm>
  )
}
