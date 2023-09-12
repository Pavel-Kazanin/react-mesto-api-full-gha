import {useContext} from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onClickImage, onCardLike, onCardDislike, onCardDelete }) {  

  const currentUser = useContext(CurrentUserContext);  
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  const handleLikeClick = () => {
    isLiked ? onCardDislike(card) : onCardLike(card);      
  };

  const handleCardClick = () => {
    onClickImage(card);    
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };
  
  return (
    <li className="gallery__card card">
      <button className={`card__delete ${!isOwn && 'card__delete_inactive'}`} name="card-delete" type="button" value="delete-card" onClick={handleDeleteClick}></button>
      <img className="card__image" alt={card.name} src={card.link} onClick={handleCardClick} />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-area">
          <button className={`card__like ${isLiked && 'card__like_active'}`} name="card-like" type="button" value="add-like" onClick={handleLikeClick}></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;