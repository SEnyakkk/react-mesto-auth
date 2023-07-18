export function InfoTooltip({name, isOpen, isSuccess, onClose, massage}) {
  return (
    <div className={`popup ${name}-popup ${isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <div className={`popup__success ${isSuccess ? "popup__success_type_ok" : "popup__success_type_fail"}`}>
        </div>
        <h2 className="popup__title popup__title_type_success"> 
          {massage}
        </h2>
        <button className="popup__close-button" type="button" onClick={onClose}/>
      </div> 
    </div>
  );
}