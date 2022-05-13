import { useState } from 'react';

function Login({ handleLogin }) {

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
    if (!email || !password) return;
    handleLogin(password, email);
    setEmail('');
    setPassword('');
  }

  return (
    <div className='sign'>
      <div className='sign__welcome'>Вход</div>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;