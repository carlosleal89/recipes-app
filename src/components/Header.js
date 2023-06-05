import React from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  console.log(location);
  return (
    <header>

      <span
        data-testid="page-title"
      >
        { location.pathname.split('/')}
      </span>

      <button
        data-testid="search-top-btn"
      >
        <img
          src={ searchIcon }
          alt="searchIcon"
        />
      </button>

      <button
        data-testid="profile-top-btn"
      >
        <img
          src={ profileIcon }
          alt="profileIcon"
        />
      </button>

    </header>
  );
}

export default Header;
