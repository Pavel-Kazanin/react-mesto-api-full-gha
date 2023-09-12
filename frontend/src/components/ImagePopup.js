import Popup from "./Popup";

function ImagePopup({ card, onClose, isOpen }) {

  return (
    <Popup isOpen={isOpen} onClose={onClose} popupContainer="image-popup__container" name="image-popup">
      <img className="popup__image" alt={card.name} src={card.link} />
      <h2 className="popup__image-title">{card.name}</h2>
    </Popup>
  )
}

export default ImagePopup;