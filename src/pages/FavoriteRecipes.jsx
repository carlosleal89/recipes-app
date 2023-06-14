import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import TitleContext from '../context/TitleContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const { setTitle } = useContext(TitleContext);
  const [products] = useState(() => {
    const localStorageData = localStorage.getItem('favoriteRecipes');
    return localStorageData ? JSON.parse(localStorageData) : [];
  });

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, [setTitle]);

  const btn = ['All', 'Meal', 'Drink'];

  console.log(products);
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
        products.map((element, index) => (
          <div
            key={ index }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ element.image }
              alt="teste"
              key={ index }
            />
            <h1
              data-testid={ `${index}-horizontal-top-text` }
            >
              {element.type === 'meal'
                ? `${element.nationality} - ${element.category}`
                : `${element.alcoholicOrNot} - ${element.category}`}
            </h1>
            <h2
              data-testid={ `${index}-horizontal-name` }
            >
              {element.name}
            </h2>
            <button>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share icon"
              />
            </button>
            <button>
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="black heart"
              />
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
