import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import logoHungry from '../images/logoHungry.png';
import '../css/Login.css';
import '../css/themes/darkTheme.css';
import ThemeToggler from '../components/ThemeToggler';

export default function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const history = useHistory();
  const MIN_PASSWORD_LENGTH = 6;

  const setLocalStorage = () => {
    const userInfo = JSON.stringify({ email: userData.email });
    localStorage.setItem('user', userInfo);
    history.push('/meals');
  };

  return (
    <main className="login-background">
      <div className="btn-theme-container">
        <ThemeToggler />
      </div>

      <div className="login-container">
        <div className="box-image">
          <img className="img-logo" src={ logoHungry } alt="logo" />
        </div>

        <div className="login-form">
          <h2 className="login-text">Login</h2>

          <label htmlFor="email-input" className="input-with-icon">
            <FaEnvelope className="icon" />
            <input
              className="login-input"
              type="text"
              id="email-input"
              value={ userData.email }
              data-testid="email-input"
              placeholder="Email"
              onChange={
                ({ target }) => setUserData({ ...userData, email: target.value })
              }
            />
          </label>
          <label htmlFor="password-input" className="input-with-icon">
            <FaLock className="icon" />
            <input
              className="login-input"
              type="password"
              id="password-input"
              value={ userData.password }
              data-testid="password-input"
              placeholder="Password"
              onChange={ ({ target }) => setUserData({
                ...userData, password: target.value,
              }) }
            />
          </label>
          <div className="button-enter">
            <button
              className="login-submit-btn"
              disabled={
                !(emailValidation.test(userData.email)
                && userData.password.length > MIN_PASSWORD_LENGTH)
              }
              data-testid="login-submit-btn"
              onClick={ setLocalStorage }
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
