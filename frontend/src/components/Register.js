import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(e) {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  // Отправка данных
  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(password, email);
    setEmail('');
    setPassword('');
  }

  return (
    <div className='sign'>
      <div className='sign__welcome'>Регистрация</div>
      <form className='sign__form' onSubmit={handleSubmit}>
        <input
          className='sign__input'
          required
          autoComplete="off"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={email || ''} />
        <input
          className='sign__input'
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={handleChange}
          value={password || ''} />
        <button
          className="sign__link"
          type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="sign__in">Уже зарегистрированы? Войти</Link>
    </div>
  );
}

export default Register;