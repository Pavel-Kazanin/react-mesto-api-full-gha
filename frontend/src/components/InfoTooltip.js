import infoImageSuccess from "../images/union.png";
import infoImageFailure from "../images/union-failure.png";
import { useNavigate } from 'react-router-dom';
import Popup from "./Popup";

function InfoTooltip(props) { 

  const navigate = useNavigate();

  const isRegisterSuccess = () => {
    return props.isRegisterSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";
  };

  const closeInfoPopup = () => {
    props.isRegisterSuccess && navigate('/signin', {replace: true});
    props.onClose();
  };

  return (
    <Popup isOpen={props.isOpen} onClose={closeInfoPopup} popupContainer="info-popup__container">      
      <img className="info-popup__image" alt={isRegisterSuccess()} src={props.isRegisterSuccess ? infoImageSuccess : infoImageFailure} />
      <p className="info-popup__text">{isRegisterSuccess()}</p>
    </Popup>
  )
}

export default InfoTooltip;