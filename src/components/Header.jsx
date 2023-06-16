import React, { useContext, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import TitleContext from '../context/TitleContext';
import logo from '../images/Logo_header.png';
import SearchBar from './SearchBar';
import '../css/Header.css';

function Header() {
  const [isShowInput, setIsShowInput] = useState(false);
  const { title } = useContext(TitleContext);
  const location = useLocation();
  const history = useHistory();

  const isShowButton = location.pathname === '/meals'
  || location.pathname === '/drinks';

  const handleSearchClick = () => {
    setIsShowInput(!isShowInput);
  };

  const handleProfileClick = () => {
    history.push('/profile');
  };

  return (
    <header className="container__header">

      <div className="container__header-logo-buttons">
        <div className="container__header-logo">
          <Link
            to="/meals"
          >
            <img src={ logo } alt="logo" width="210px" />
          </Link>
        </div>

        <div className="container__header-buttons">
          {isShowButton && (
            <button
              type="button"
              className="header-buttons"
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
            className="header-buttons"
            onClick={ handleProfileClick }
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profileIcon"
            />
          </button>
        </div>
      </div>

      <div className="container__header-title">
        <h2
          data-testid="page-title"
          className="page-title"
        >
          { title }
        </h2>
      </div>

      <div className="container__header-search">
        {isShowInput && (
          <div className={ `search-bar ${isShowInput ? 'active' : ''}` }>

            <SearchBar />
          </div>
        )}
      </div>

    </header>
  );
}

export default Header;
