import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ onAddPlace, isOpen, onClose }) {

  // Рефы инпутов
  const cardNameRef = useRef();
  const cardLinkRef = useRef();

  // Отправка формы
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: cardNameRef.current.value, link: cardLinkRef.current.value });
    cardNameRef.current.value = '';
    cardLinkRef.current.value = '';
  }

  return (
    <PopupWithForm
      name="add-element"
      title="Новое место"
      submitText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          id="element-title"
          type="text"
          className="popup__input popup__input_info_title"
          name="name"
          placeholder="Название"
          required
          autoComplete="off"
          minLength="2"
          maxLength="30"
          ref={cardNameRef}
        />
        <span id="element-title-error" className="popup__error"></span>
        <input
          id="element-image"
          type="url"
          className="popup__input popup__input_info_image"
          name="link"
          placeholder="Ссылка на картинку"
          required
          autoComplete="off"
          ref={cardLinkRef}
        />
        <span id="element-image-error" className="popup__error"></span>
      </>
    </PopupWithForm>
  );
}