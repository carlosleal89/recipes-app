import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/';
import './Login.css';

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
    <div className="login-page-div">
      <h1>Recipes</h1>
      <h2>Login</h2>
      <div className="inputs-div">
        <label htmlFor="email-input">
          <input
            type="text"
            id="email-input"
            value={ userData.email }
            data-testid="email-input"
            placeholder="Email"
            onChange={ ({ target }) => setUserData({ ...userData, email: target.value }) }
          />
        </label>
        <label htmlFor="password-input">
          <input
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
        <button
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
  );
}
