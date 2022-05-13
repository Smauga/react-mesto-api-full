import successImage from "../images/info-tooltip-success.svg";
import failImage from "../images/info-tooltip-fail.svg";
import { useCloseWithEsc } from '../utils/hooks'

function InfoTooltip({ isOpen, onClose, successSign }) {

  useCloseWithEsc(isOpen, onClose);

  return (
    <>
      <div className={isOpen ? 'popup popup_type_info-tooltip popup_opened' : 'popup popup_type_info-tooltip'} onClick={onClose}>
        <div className="popup__container">
          <button
            className="popup__close"
            type="button"
            aria-label="Закрыть поп-ап"
          ></button>
          <img src={successSign ? successImage : failImage} alt="Логотип" className="popup__tooltip-image" />
          <h2 className="popup__tooltip-text">{successSign ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;