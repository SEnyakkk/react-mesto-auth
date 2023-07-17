import logo from '../../images/mestologo.svg'
import React from "react";
import { Link, Route, Routes } from 'react-router-dom';

export function Header({ userEmail , onSignOut, }) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Места России"
        className="header__logo"
      />
      <Routes>
        <Route path="/sign-in" element={
          <Link to="/sign-up" className="header__link ">
            Регистрация
          </Link>
        } />

        <Route path="/sign-up" element={
          <Link to="/sign-in" className="header__link ">
            Войти
          </Link>
        } />

        <Route exact path="/" element={
          <div className="header__container">
            <p className="header__email">{userEmail}</p>
            <Link to="/sign-in" className="header__link " onClick={onSignOut}>
              Выйти
            </Link>
          </div>
        } />
      </Routes>
    </header >
  )
}