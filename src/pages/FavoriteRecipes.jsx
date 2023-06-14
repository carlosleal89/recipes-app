import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import TitleContext from '../context/TitleContext';
import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const { setTitle } = useContext(TitleContext);
  // const [isFavorite, setIsFavorite] = useState(false);
  const [getLocalStorage, setLocalStorage] = useState([]);

  const checkFavorites = async () => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = localStorage.getItem('favoriteRecipes');
      const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
      setLocalStorage(newFavoriteRecipesArray);
    }
  };

  useEffect(() => {
    setTitle('Favorite Recipes');
    checkFavorites();
  }, [setTitle]);
  console.log(getLocalStorage[0]);

  const btn = ['All', 'Meal', 'Drink'];

  return (
    <div>
      <Header />
      {
        btn.map((element, index) => (
          <button
            style={ {
              fontSize: 15,
              fontStyle: 'italic',
              padding: 0,
              margin: 0,
              marginLeft: '0.5rem',
              marginRight: '0.5rem',
            } }
            key={ index }
            data-testid={ `filter-by-${element.toLowerCase()}-btn` }
          >
            {element}
          </button>
        ))
      }
      {
        getLocalStorage.map((element, index) => (
          <div
            key={ index }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ element[0] }
              alt="teste"
              key={ index }
            />
            <h1
              data-testid={ `${index}-horizontal-top-text` }
            >
              A
            </h1>
            <h2
              data-testid={ `${index}-horizontal-name` }
            >
              B
            </h2>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
            >
              <img
                src={ shareIcon }
                alt="share icon"
              />
            </button>
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              Favorite
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
