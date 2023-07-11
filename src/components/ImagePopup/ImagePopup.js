export function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_zoom ${isOpen && 'popup_opened'}`}>
      <figure className="popup__figure-popup">
        <button className="button popup__close-button " type="button" onClick={onClose} />
        <img className="popup__figure-image" src={card.link} alt={card.name} />
        <figcaption className="popup__figure-caption">{card.name}</figcaption>
      </figure>
    </div>
  )
}