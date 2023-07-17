import React from "react";
import { PopupWithForm } from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";


export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [description, setDescription] = React.useState('');
  const [profileName, setProfileName] = React.useState('');
  const { name, about } = currentUser;


  function handleNameChange(evt) {
    setProfileName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: profileName,
      about: description,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      setProfileName(name);
      setDescription(about);
    }
  }, [isOpen, currentUser]);
  
  return (
    <PopupWithForm
      name={`profile`}
      title={`Редактировать профиль`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}

    >
      <input
        type="text"
        minLength={2}
        maxLength={40}
        required
        className={`form__data form__data_user_name`}
        name="username"
        value={profileName}
        onChange={handleNameChange}
        placeholder="Ведите имя"

      />
      <span className="popup__invalid" ></span>
      <input
        type="text"
        minLength={2}
        maxLength={200}
        required
        className={`form__data form__data_user_job`}
        name="userjob"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="О себе"
      />
      <span className="popup__invalid"></span>
    </PopupWithForm>
  )
}