import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Footer } from "./Footer/Footer";
import { PopupWithForm } from "./PopupWithForm/PopupWithForm";
import { ImagePopup } from "./ImagePopup/ImagePopup";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { EditProfilePopup } from "./EditProfilePopup/EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup/EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup/AddPlacePopup";
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute";
import { Login } from "./Login";
import { Register } from "./Register";
import { authApi } from "../utils/authApi";
import { InfoTooltip } from "./InfoTooltip";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [deleteCard, setDeleteCard] = useState('')
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTolltipSuccess, setIsInfoTolltipSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkJwt();
  },)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  function handleDeleteClick(id) {
    setDeleteCard(id)
    setIsDeletePopupOpen(true)
  }

  function handleCardDelete(evt) {
    evt.preventDefault()
    api.removeCard(deleteCard)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCard
        }))
        closeAllPopups()
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addlike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(console.error);
    } else {
      api.removelike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(console.error);
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopupOpen(false)
    setIsDeletePopupOpen(false)
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((values) => {
        setCurrentUser(values);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(data) {
    api.setAvatar(data)
      .then((values) => {
        setCurrentUser(values);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.getInfo(), api.getInitialCards()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser)
        setCards(dataCard)
        setIsLoading(false)
      })
      .catch(console.error);
  }, [])

  function handleRegister(email, password) {
    authApi.registerUser(email, password)
      .then((res) => {
        if (res) {
          setIsInfoTolltipSuccess(true);
          navigate(`/sing-in`, { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false);
        console.log(err);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin(email, password) {
    authApi.loginUser(email, password)
      .then((data) => {
        if (data.jwt) {
          setUserEmail(email);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.jwt);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function checkJwt() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          userEmail(res.data.email);
          navigate('/', {replace: true})
        })
        .catch(err => console.log(err));
    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          userEmail={userEmail}

        />

        <Routes>
          <Route path="/" element={<ProtectedRoute
            element={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            isLoading={isLoading}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
            isLoggedIn={isLoggedIn} 
            onSignOut={signOut}/>}
          />

          <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />

          <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />

          <Route path='*' element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace/>} />
        

        </Routes>



        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name={`delete`}
          title={`Вы уверены?`}
          onClose={closeAllPopups}
          buttonText={'Удалить'}
          isOpen={isDeletePopupOpen}
          onSubmit={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          name={`success`}
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSuccess={isInfoTolltipSuccess}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
