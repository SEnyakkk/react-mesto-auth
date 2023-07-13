import { useState } from "react";
import { Link } from "react-router-dom";

export function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({
      email,
      password,
    });
  }
  return (
    <form
      className="login__form"
      name="register"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="login__title">Регистрация</h2>
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
        type="submit">Зарегистрироваться</button>
      <div className="login__signin">
        <Link to="/sign-in" className="login__signin-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </form>
  )
}