import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {

  // Реф инпута аватарки
  const avatarRef = useRef();

  // Отправка формы
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          id="prifile-avatar"
          type="url"
          className="popup__input popup__input_info_avatar"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          autoComplete="off"
          ref={avatarRef}
        />
        <span id="prifile-avatar-error" className="popup__error"></span>
      </>
    </PopupWithForm>
  );
}