import { useCloseWithEsc } from '../utils/hooks'

function ImagePopup({ card, onClose }) {

  // Навешивание и удаление обработчика при открытой карточке
  useCloseWithEsc(card, onClose);

  return (
    <div className={Object.keys(card).length ? "popup popup_type_open-element popup_opened" : "popup popup_type_open-element"} onClick={onClose}>
      <div className="popup__element-container">
        <img
          src={card.link}
          alt={card.name}
          className="popup__image"
        />
        <h2 className="popup__image-name">{card.name}</h2>
        <button
          className="popup__close"
          aria-label="Закрыть элемент"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;