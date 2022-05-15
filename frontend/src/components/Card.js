import { useContext } from "react";
import { CurrentUser } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const user = useContext(CurrentUser);
  const isOwn = card.owner === user._id;
  const isLiked = card.likes.some(i => i === user._id);

  // Функция клика на карточку
  function handleClick() { onCardClick(card); }
  function handleLike() { onCardLike(card); }
  function handleDelete() { onCardDelete(card); }

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={isLiked ? "element__button-like element__button-like_active" : "element__button-like"}
            type="button"
            aria-label="Лайк"
            onClick={handleLike}
          ></button>
          <p className="element__likes-count">{card.likes.length}</p>
        </div>
        <button
          className={isOwn ? "element__button-delete element__button-delete_active" : "element__button-delete"}
          type="button"
          aria-label="Удалить"
          onClick={handleDelete}
        ></button>
      </div>
    </li>
  );
}

export default Card;