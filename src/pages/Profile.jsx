import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TitleContext from '../context/TitleContext';
import iconDone from '../images/icon _done_.png';
import iconFavorite from '../images/icon_favorite.png';
import iconLogout from '../images/icon_logout.png';
import '../css/Profile.css';

function Profile() {
  const { setTitle } = useContext(TitleContext);
  const history = useHistory();

  const [userEmail, setUserEmail] = useState();

  const handleButton = (route) => {
    if (route === '/') {
      localStorage.removeItem('user');
      localStorage.removeItem('favoriteRecipes');
      localStorage.removeItem('doneRecipes');
      localStorage.removeItem('inProgressRecipes');
    }
    history.push(route);
  };

  useEffect(() => {
    setTitle('Profile');
    if (localStorage.user) {
      const emailLocalStorage = localStorage.getItem('user');
      const { email } = JSON.parse(emailLocalStorage);
      setUserEmail(email);
    }
  }, [setTitle]);

  return (
    <div>
      <Header />
      <div className="container__profile">
        <h4
          className="profile-email"
          data-testid="profile-email"
        >
          {userEmail}
        </h4>
        <div className="container__profile-buttons">
          <button
            onClick={ () => handleButton('/done-recipes') }
            data-testid="profile-done-btn"
            className="profile-btn"
          >
            <img src={ iconDone } alt="icon done" />
            <span className="button-text">Done Recipes</span>
          </button>
          <button
            onClick={ () => handleButton('/favorite-recipes') }
            data-testid="profile-favorite-btn"
            className="profile-btn"
          >
            <img src={ iconFavorite } alt="icon done" />
            <span className="button-text">Favorite Recipes</span>
          </button>
          <button
            onClick={ () => handleButton('/') }
            data-testid="profile-logout-btn"
            className="profile-btn"
          >
            <img src={ iconLogout } alt="icon done" />
            <span className="button-text">Logout</span>
          </button>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Profile;
