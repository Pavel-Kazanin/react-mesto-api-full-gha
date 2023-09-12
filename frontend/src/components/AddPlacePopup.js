import { useEffect } from 'react';
import useForm  from '../hooks/useForm.js';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose, isLoading }) { 

  const formInputs = useForm('');  

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: formInputs.values.name,
      link: formInputs.values.about   
    });    
  }  

  useEffect(() => {    
    formInputs.setValues({name: '', about: ''});    
  }, [isOpen]);

  return (
    <PopupWithForm isLoading={isLoading} onSubmit={handleSubmit} onClose={onClose} name="photo-popup" title="Новое место" buttonText="Создать" isOpen={isOpen}>
      <input id="title-input" className="form__text form__text_value_title" value={formInputs.values.name ?? ''} type="text" name="name" placeholder="Название" minLength="2" maxLength="30" onChange={formInputs.handleChange} required />
      <span className="title-input-error form__text-error"></span>
      <input id="url-input" className="form__text form__text_value_link" value={formInputs.values.about ?? ''} type="url" name="about" placeholder="Ссылка на картинку" onChange={formInputs.handleChange} required />
      <span className="url-input-error title-input-error form__text-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;