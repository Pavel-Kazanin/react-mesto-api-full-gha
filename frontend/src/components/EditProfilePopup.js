import {useContext, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from '../contexts/CurrentUserContext';
import useForm  from '../hooks/useForm.js';

function EditProfilePopup({ onUpdateUser, isOpen, onClose, isLoading}) {  

  const currentUser = useContext(CurrentUserContext);

  const formInputs = useForm({});     

  useEffect(() => {
    formInputs.setValues({name: currentUser.name, about: currentUser.about});    
  }, [currentUser, isOpen]);   

  function handleSubmit(e) {    
    e.preventDefault();
  
    onUpdateUser({
      name: formInputs.values.name,      
      about: formInputs.values.about
    });
  }

  return (
    <PopupWithForm isLoading={isLoading} onClose={onClose} onSubmit={handleSubmit} name="profile-popup" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen}>
      <input id="name-input" className="form__text form__text_value_name" value={formInputs.values.name ?? ''} type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" onChange={formInputs.handleChange} required />
      <span className="name-input-error form__text-error"></span>
      <input id="about-input" className="form__text form__text_value_about" value={formInputs.values.about ?? ''} type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" onChange={formInputs.handleChange} required />
      <span className="about-input-error form__text-error "></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;