import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose, isLoading}) {

  const avatarRef = useRef('');

  function handleSubmit(e) {    
    e.preventDefault();          
  
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });

    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm isLoading={isLoading} onSubmit={handleSubmit} onClose={onClose} name="avatar-popup" title="Обновить аватар" buttonText="Изменить" isOpen={isOpen}>
      <input id="avatar-url-input" className="form__text form__text_value_link" ref={avatarRef} type="url" name="link" placeholder="Ссылка на картинку" required />
      <span className="avatar-url-input-error title-input-error form__text-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;