import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/';
import '../css/Login.css';

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
    <div className="login-background">
      <div className="img-logo"> </div>
      <div className="login-page-div">
        <h2 className="login-text">Login</h2>
        <div className="inputs-div">
          <label htmlFor="email-input">
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
          <label htmlFor="password-input">
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
          <div>
            <button
              className="login-submit-btn"
              disabled={
                !(emailValidation.test(userData.email)
                && userData.password.length > MIN_PASSWORD_LENGTH)
              }
              data-testid="login-submit-btn"
              onClick={ setLocalStorage }
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
