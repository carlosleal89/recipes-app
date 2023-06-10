import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TitleContext from '../context/TitleContext';

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
      <div>
        <h3 data-testid="profile-email">{userEmail}</h3>
        <div>
          <button
            onClick={ () => handleButton('/done-recipes') }
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
          <button
            onClick={ () => handleButton('/favorite-recipes') }
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
          <button
            onClick={ () => handleButton('/') }
            data-testid="profile-logout-btn"
          >
            Logout
          </button>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Profile;
