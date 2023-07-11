import { useContext } from "react"

import { Card } from "../Card/Card"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Spinner from "../Spinner/Spinner"
export function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete, cards, isLoading, onCardLike }) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__nav">
          <button type="button" className="profile__avatar-edit" onClick={onEditAvatar}>
            <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
          </button>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__info-title">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" onClick={onEditProfile} />
            </div>
            <h2 className="profile__info-subtitle">{currentUser.about}</h2>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace} />
      </section>
      <template className="place-template" />
      <section className="elements" aria-label="ваш фотоальбом">
        <ul className="elements__list">
          {isLoading ? <Spinner /> : cards.map(data => {
            return (
              <li className="place" key={data._id}>
                <Card
                  card={data}
                  onCardClick={onCardClick}
                  onCardDelete={onCardDelete}
                  onCardLike={onCardLike}
                />
              </li>
            )
          })}
        </ul>
      </section>

    </main>
  )

}