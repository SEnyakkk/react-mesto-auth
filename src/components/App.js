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
import { DeletePopup } from "./DeletePopup";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isUserDataLoading, setIsUserDataLoading] = useState(false)
  const [cardToDelete, setCardToDelete] = useState({})
  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      setIsUserDataLoading(true)
      Promise.all([api.getInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
        .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser)
          setCards(dataCard)
        })
        .catch(err => console.log(err))
        .finally(() => setIsUserDataLoading(false))
    }
  }, [loggedIn]);


  useEffect(() => {
    checkToken();
  }, [])

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
    setCardToDelete(id)
    setIsDeletePopupOpen(true)
  }

  function handleCardDelete(cardToDelete) {
    api.removeCard(cardToDelete, localStorage.jwt)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardToDelete))
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id, localStorage.jwt)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(console.error);
    } else {
      api.removeLike(card._id, localStorage.jwt)
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
    api.setUserInfo(data, localStorage.jwt)
      .then((values) => {
        setCurrentUser(values);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(data) {
    api.setAvatar(data, localStorage.jwt)
      .then((values) => {
        setCurrentUser(values);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data, localStorage.jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleRegister(email, password) {
    authApi.registerUser(email, password)
      .then((res) => {
        setIsInfoTooltipSuccess(true);
        navigate(`/sign-in`, { replace: true });
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        console.log(err);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin(email, password) {
    authApi.loginUser(email, password)
      .then((data) => {
        setUserEmail(email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authApi.checkJwt(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate('/', { replace: true })
        })
        .catch(err => console.log(err));
    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
    setLoggedIn(false);
    setUserEmail('')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header
        userEmail={userEmail}
        onSignOut={signOut}
      />

      <Routes>
        <Route path="/" element={<ProtectedRoute
          element={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          isUserDataLoading={isUserDataLoading}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
          loggedIn={loggedIn}
        />}
        />

        <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />

        <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />

        <Route path='*' element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />

      </Routes>

      <Footer />

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

      <DeletePopup
        card={cardToDelete}
        onClose={closeAllPopups}
        isOpen={isDeletePopupOpen}
        onDelete={handleCardDelete}
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
        isSuccess={isInfoTooltipSuccess}
        massage={isInfoTooltipSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз'}
      />
    </CurrentUserContext.Provider >
  );
}

export default App;
