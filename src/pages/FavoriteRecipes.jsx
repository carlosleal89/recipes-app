import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import TitleContext from '../context/TitleContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const { setTitle } = useContext(TitleContext);
  const [clipBoardmsg, setClipBoardMsg] = useState(false);
  const [products, setProducts] = useState(() => {
    const localStorageData = localStorage.getItem('favoriteRecipes');
    return localStorageData ? JSON.parse(localStorageData) : [];
  });

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, [setTitle]);

  const clipboardShare = (link) => {
    copy(link);
    setClipBoardMsg(true);
  };

  const btn = ['All', 'Meal', 'Drink'];

  const handleClickFavorite = (id) => {
    const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const removedId = localStorageData.filter((e) => e.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removedId));
    setProducts(removedId);
  };

  const handleClickFilter = (filter) => {
    if (filter === 'All') {
      const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));
      return setProducts(localStorageData);
    }
    if (filter === 'Meal') {
      const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const mealFilter = localStorageData.filter((e) => e.type === 'meal');
      return setProducts(mealFilter);
    }
    const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const drinkFilter = localStorageData.filter((e) => e.type === 'drink');
    setProducts(drinkFilter);
  };

  return (
    <div>
      <Header />
      {
        btn.map((element, index) => (
          <button
            onClick={ () => handleClickFilter(element) }
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
      <div data-testid="products-holder">
        {
          products.map((element, index) => (
            <div
              key={ index }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ element.image }
                alt={ element.name }
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
              <button
                onClick={ () => clipboardShare(element.type === 'meal'
                  ? `http://localhost:3000/meals/${element.id}`
                  : `http://localhost:3000/drinks/${element.id}`) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share icon"
                />
              </button>
              {
                clipBoardmsg && <p className="clipboard-msg">Link copied!</p>
              }
              <button
                onClick={ () => handleClickFavorite(element.id) }
              >
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
    </div>
  );
}

export default FavoriteRecipes;
