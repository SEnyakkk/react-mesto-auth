import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`place__like ${isLiked && 'place__like_active'}`); 
  return (
    <>
      {isOwn && <button className="place__delete" type="button" onClick={() => onCardDelete(card._id)}/>}
      <img className="place__image" src={card.link} alt={card.name} onClick={() => onCardClick(card)} />
      <div className="place__container">
        <h2 className="place__text">{card.name}</h2>
        <div className="place__group" >
          <button className={cardLikeButtonClassName} type="button" onClick={() => onCardLike(card)} />
          <span className="place__counter">{card.likes.length}</span>
        </div>
      </div>
    </>
  )
}