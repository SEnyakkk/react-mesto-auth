import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`place__like ${isLiked && 'place__like_active'}`); 
  const handleDeletCard = () => onCardDelete(card._id)
  const handleOpenCard = () => onCardClick(card)
  const handleLikeCard = () => onCardLike(card)

  return (
    <>
      {isOwn && <button className="place__delete" type="button" onClick={handleDeletCard}/>}
      <img className="place__image" src={card.link} alt={card.name} onClick={handleOpenCard} />
      <div className="place__container">
        <h2 className="place__text">{card.name}</h2>
        <div className="place__group" >
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeCard} />
          <span className="place__counter">{card.likes.length}</span>
        </div>
      </div>
    </>
  )
}