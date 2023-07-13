import { useState } from 'react';

export function Login({ onLogin }) {
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({
      email,
      password,
    });

  }
  return (
    <form onSubmit={handleSubmit} className="login__form" noValidate>
      <h2 className="login__title">Вход</h2>
      <input
        className="login__input"
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
      />
      <input
        className="login__input"
        name="password"
        type="password"
        placeholder="Пароль"
        onChange={handlePasswordChange}
        value={password}
      />
      <button
        className="login__button"
        type="submit">Войти</button>
    </form>
  )
}

