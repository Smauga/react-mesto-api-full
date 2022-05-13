import { useContext } from "react";
import Card from "./Card";
import { CurrentUser } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, cardList, onCardClick, onCardLike, onCardDelete }) {

  // Подписка на контекст
  const user = useContext(CurrentUser);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={user.avatar} alt="Аватар" className="profile__avatar" />
          <button
            className="profile__button-avatar"
            type="button"
            aria-label="Изменить аватар"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{user.name}</h1>
          <button
            className="profile__button-edit"
            type="button"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          ></button>
          <p className="profile__status">{user.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="Добавить фотографию"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__items">
          {cardList.map((card) =>
            <Card card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id} />
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
