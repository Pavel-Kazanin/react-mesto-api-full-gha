import Popup from "./Popup";

function PopupWithForm(props) {

  const loadingText = 'Сохранение...';

  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose} popupContainer="popup__container">
      <form className="form form-photo" name={props.name} onSubmit={props.onSubmit} noValidate>
        <h2 className="form__title">{props.title}</h2>
        {props.children}
        <input className="form__submit-button" type="submit" value={props.isLoading ? loadingText : props.buttonText} />
      </form>
    </Popup>
  )
}

export default PopupWithForm;