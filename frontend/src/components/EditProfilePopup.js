import { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUser } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {

  // Подписка на контекст
  const user = useContext(CurrentUser);

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах
  useEffect(() => {
    if (user) {
      setName(user.name);
      setDescription(user.about);
    }
  }, [user, isOpen]);

  // Стейт переменные
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Изменение стейтов при вводе данных в инпут
  function handleChange(e) {
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'about') {
      setDescription(e.target.value);
    }
  }

  // Отправка данных
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="edit-profile"
      title="Редактировать профиль"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="profile-name"
        type="text"
        className="popup__input popup__input_info_name"
        name="name"
        placeholder="Имя"
        required
        autoComplete="off"
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={name || ""}
      />
      <span id="profile-name-error" className="popup__error"></span>
      <input
        id="profile-job"
        type="text"
        className="popup__input popup__input_info_status"
        name="about"
        placeholder="Работа"
        required
        autoComplete="off"
        minLength="2"
        maxLength="200"
        onChange={handleChange}
        value={description || ""}
      />
      <span id="profile-job-error" className="popup__error"></span>
    </PopupWithForm>
  );
}