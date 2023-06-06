import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import TitleContext from '../context/TitleContext';

function Header() {
  const { title } = useContext(TitleContext);
  const location = useLocation();
  const history = useHistory();

  const showButton = location.pathname === '/meals' || location.pathname === '/drinks';

  const handleSearchClick = () => {
    console.log('clicou');
  };

  const handleProfileClick = () => {
    history.push('/profile');
  };

  return (
    <header>

      <span
        data-testid="page-title"
      >
        { title }
      </span>

      {showButton && (
        <button
          type="button"
          onClick={ handleSearchClick }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="searchIcon"
          />
        </button>
      )}

      <button
        type="button"
        onClick={ handleProfileClick }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profileIcon"
        />
      </button>
    </header>
  );
}

export default Header;
