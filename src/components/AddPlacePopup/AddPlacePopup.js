import { PopupWithForm } from "../PopupWithForm/PopupWithForm";
import React from "react";

export function AddPlacePopup({onAddCard, isOpen, onClose}) {
  const nameRef = React.useRef("");
  const linkRef = React.useRef("");


  function handleSubmit(evt) {
    evt.preventDefault();
    onAddCard({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
  }

  React.useEffect(() => {
    if (!isOpen) {
      nameRef.current.value = "";
      linkRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name={`place`}
      title={`Новое место`}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Добавить'}
      onSubmit={handleSubmit}

    >
      <input
        type="text"
        maxLength={30}
        minLength={2}
        required
        className="form__data form__data_user_place "
        name="userplace"
        placeholder="Название"
        ref={nameRef}
      />
      <span className=" popup__invalid popup__invalid_userplace "></span>
      <input
        type="url"
        required=""
        className="form__data form__data_user_url "
        name="userurl"
        placeholder="Ссылка на картинку"
        ref={linkRef}
      />
      <span className=" popup__invalid popup__invalid_userurl "></span>
    </PopupWithForm>

  )
}
