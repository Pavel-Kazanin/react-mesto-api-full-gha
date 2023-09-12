import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ onCardDelete, isOpen, onClose, cardId, isLoading }) { 

  function handleSubmit(e) {
    e.preventDefault();    
    onCardDelete(cardId);
  }

  return (
    <PopupWithForm isLoading={isLoading} onSubmit={handleSubmit} onClose={onClose} name="confirm-popup" title="Вы уверены?" buttonText="Да" isOpen={isOpen} />
  )
}

export default ConfirmDeletePopup;