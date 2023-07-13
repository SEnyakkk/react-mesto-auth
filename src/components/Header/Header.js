import logo from '../../images/mestologo.svg'
import React from "react";
import { Link, Route, Routes } from 'react-router-dom';

export function Header({email, onSignOut}) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Места России"
        className="header__logo"
      />
      <Routes>
        <Route path="/sign-in">
          <Link to="sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>

        <Route path="/sign-up">
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        </Route>

        <Route exact path="/">
          <div className="header__container">
            <p className="header__email">{email}</p>
            <Link to="sign-in" className="" onClick={onSignOut}>
              Выйти
            </Link>
          </div>
        </Route>
      </Routes>
    </header>
  )
}