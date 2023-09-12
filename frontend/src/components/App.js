import {useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import auth from '../utils/auth.js';
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from './Login';
import Register from './Register';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from "./ImagePopup";
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from "../utils/api";
import CurrentUserContext from '../contexts/CurrentUserContext';
import checkResponse from '../utils/checkResponse.js';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isRegisterSuccess, setRegisterSuccess] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});  
  const [currentUser, setCurrentUser] = useState({});
  const [cardId, setCardId] = useState('');
  const [isLoading, setIsLoading] = useState(false);  
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');  

  const [cards, setCards] = useState([]); 

  const navigate = useNavigate();

  useEffect(() => {    
    api.getInitialCards().then(data => {               
      setCards(data.reverse());            
    })
    .catch((err) => {
      console.log(err);
    });
  },[loggedIn]);

  useEffect(() => {
    api.getUserInfo().then(userInfo => {               
      setCurrentUser(userInfo);            
    })
    .catch((err) => {
      console.log(err);
    });
  },[loggedIn]); 
  
  useEffect(() => {
    handleTokenCheck();
  },[loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);    
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);    
  }
  
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }  

  function handleImageClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);    
  }

  function handleTrashClick() {
    setConfirmPopupOpen(true);
  }  

  function closeAllPopups() {    
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setInfoPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {    
    api.addLike(card._id).then((newCard) => {
      const newCards = cards.map((item) => item._id === card._id ? newCard : item);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDislike(card) {
    api.deleteLike(card._id).then((newCard) => {
      const newCards = cards.map((item) => item._id === card._id ? newCard : item);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  } 

  function handleConfirmDelete(card) {
    handleTrashClick();    
    setCardId(card._id);
  }

  function handleCardDelete(cardId) { 
    setIsLoading(true);   
    api.deleteCard(cardId).then(() => {
      const newCards = cards.filter(item => item._id !== cardId);
      setCards(newCards);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);          
    });
  }

  function handleUpdateUser(info) {  
    setIsLoading(true);   
    api.setUserInfo(info.name, info.about).then((newUserInfo) => {      
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);          
    });
  }

  function handleUpdateAvatar(info) {
    setIsLoading(true);
    api.changeAvatar(info.avatar).then((newAvatar) => {      
      setCurrentUser(newAvatar);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);          
    });
  }  

  function handleAddPlaceSubmit(card) {  
    setIsLoading(true);           
    api.addNewCard(card.name, card.link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);          
    })
  }  
  
  function handleRegistrationSubmit(password, email) {
    auth.registerUser(password, email)
    .then((res) => {       
      if (res.ok) {
        setRegisterSuccess(true)         
        return res.json();
      } else {
        setRegisterSuccess(false);
        setInfoPopupOpen(true);
        return Promise.reject(`Ошибка: ${res.status}`);
      }      
    })
    .then((res) => {
      setInfoPopupOpen(true);    
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAuthSubmit(password, email) {
    auth.authorizeUser(password, email)
      .then(checkResponse)      
      .then((data) => {               
        if (data) {   
          setUserEmail(data.email);       
          setLoggedIn(true);          
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  } 

  function handleSignOut() {
    auth.signOut()    
    .then(() => {
      setLoggedIn(false);
      navigate('/signin', { replace: true });
    }) 
    .catch((err) => {
      console.log(err);
    })   
  }

  const handleTokenCheck = () => {
      auth.checkToken() 
      .then(checkResponse)     
      .then((data) => {                               
        if(data) {
          setUserEmail(data.email);           
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      })    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header loggedIn={loggedIn} userEmail={userEmail} signOut={handleSignOut} />
          <Routes>
            <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />           
            <Route path="/" element={<ProtectedRoute element={Main} loggedIn={loggedIn} cards={cards} onCardDelete={handleConfirmDelete} onCardLike={handleCardLike} onCardDislike={handleCardDislike} onImage={handleImageClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />} />
            <Route path="/signin" element={<Login onAuthSubmit={handleAuthSubmit} />} />
            <Route path="/signup" element={<Register onRegisterUser={handleRegistrationSubmit} />} />
          </Routes>
          <Footer />
          <EditProfilePopup isLoading={isLoading} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup isLoading={isLoading} onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          <ConfirmDeletePopup isLoading={isLoading} cardId={cardId} onCardDelete={handleCardDelete} isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup isLoading={isLoading} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} /> 
          <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
          <InfoTooltip onClose={closeAllPopups} isOpen={isInfoPopupOpen} isRegisterSuccess={isRegisterSuccess} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
