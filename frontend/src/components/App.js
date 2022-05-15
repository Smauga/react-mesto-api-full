import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from "../utils/api";
import { CurrentUser } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function App() {

  const history = useHistory();

  // Стейт-переменные
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [successSign, setSuccessSign] = useState(false);


  // Получение данных юзера и карточек
  useEffect(() => {
    handleTokenCheck();
    if (loggedIn) {
      api.getUserData(localStorage.getItem('jwt'))
        .then(data => {
          setCurrentUser(data);
        })
        .catch(error => console.log(error));
      api.getCards(localStorage.getItem('jwt'))
        .then(cards => {
          setCards(cards);
        })
        .catch(error => console.log(error));
    }
  }, [loggedIn]);


  // Функции изменения состояния
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);

  // Функция авторизации
  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          handleTokenCheck();
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccessSign(false);
        setIsInfoTooltipOpen(true);
      });
  }

  // Функция регистрации
  function handleRegister(password, email) {
    auth.register(password, email)
      .then(() => {
        setSuccessSign(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setSuccessSign(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  // Функция проверки токена
  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);  
          setEmail(res.email);
          setLoggedIn(true);
        })
        .then(() => history.push('/'))
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Функция удаления токена
  function signOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  // Функция закрытия попапов
  function closeAllPopups(evt) {
    if (evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close') ||
      evt.key === "Escape"
    ) {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsInfoTooltipOpen(false);
      setSelectedCard({});
    }
  }

  // Отправка данных о юзере
  function handleUpdateUser(user) {
    api.setUserData(user, localStorage.getItem('jwt'))
      .then(data => {
        console.log(data);
        setCurrentUser(data);
      })
      .catch(error => console.log(error))
      .finally(() => setIsEditProfilePopupOpen(false));
  }

  // Отправка данных о аватаре
  function handleUpdateAvatar(user) {
    api.setUserAvatar(user, localStorage.getItem('jwt'))
      .then(data => {
        setCurrentUser(data);
      })
      .catch(error => console.log(error))
      .finally(() => setIsEditAvatarPopupOpen(false));
  }

  // Изменение лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked, localStorage.getItem('jwt'))
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(error => console.log(error));
  }

  // Удаление карточки
  function handleCardDelete(card) {
    const deleteCardID = card._id;
    api.deleteCard(card, localStorage.getItem('jwt'))
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== deleteCardID));
      })
      .catch(error => console.log(error));
  }

  // Добавление карточки
  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link }, localStorage.getItem('jwt'))
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .catch(error => console.log(error))
      .finally(() => setIsAddPlacePopupOpen(false));
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUser.Provider value={currentUser}>
          <Header
            email={email}
            signOut={signOut}
          />
          <Switch>
            <Route path='/sign-in'>
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path='/sign-up'>
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path='/'>
              <ProtectedRoute loggedIn={loggedIn} component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cardList={cards}
              />

              <Footer />

              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser} />

              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
              />

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar} />

              <PopupWithForm
                name="delete-card"
                title="Вы уверены?"
                submitText="Да"
                isOpen={false}
              >
                <></>
              </PopupWithForm>

              <ImagePopup
                onClose={closeAllPopups}
                card={selectedCard} />
            </Route>
          </Switch>

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            successSign={successSign} />

        </CurrentUser.Provider>
      </div>
    </div>
  );
}

export default App;
