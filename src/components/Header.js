import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import TitleContext from '../context/TitleContext';

function Header() {
  const { title } = useContext(TitleContext);
  const location = useLocation();

  console.log(location.pathname);

  const showButton = location.pathname === '/meals' || location.pathname === '/drinks';
  console.log(showButton);

  // const pathname = location.pathname.slice(1);
  // const pageName = pathname.charAt(0).toUpperCase();

  return (
    <header>

      <span
        data-testid="page-title"
      >
        { title }
      </span>

      {showButton && (
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="searchIcon"
        />
      )}

      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="profileIcon"
      />

    </header>
  );
}

export default Header;
