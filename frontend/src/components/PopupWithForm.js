import { useCloseWithEsc } from '../utils/hooks'

function PopupWithForm({ isOpen, onClose, name, title, onSubmit, children, submitText }) {

  // Навешивание и удаление обработчика при открытой карточке
  useCloseWithEsc(isOpen, onClose);

  return (
    <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`} onClick={onClose}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть поп-ап"
        ></button>
        <form
          id={`form-${name}`}
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className="popup__save"
            type="submit"
          >
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;