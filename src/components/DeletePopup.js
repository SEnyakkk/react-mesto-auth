import { PopupWithForm } from "./PopupWithForm/PopupWithForm";

export function DeletePopup({ card, onClose, isOpen, onDelete, }) {

	function handleSubmit(evt) {
		evt.preventDefault();
		onDelete(card);
		onClose();
	}

	return (
		<PopupWithForm title="Вы уверены?"
			name="delete"
			isOpen={isOpen}
			onClose={onClose}
			buttonText="Да"
			onSubmit={handleSubmit}
		/>
	)
}
