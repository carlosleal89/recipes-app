import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import TitleContext from '../context/TitleContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const { setTitle } = useContext(TitleContext);
  const [clipBoardmsg, setClipBoardMsg] = useState();
  const [products, setProducts] = useState(() => {
    const localStorageData = localStorage.getItem('favoriteRecipes');
    return localStorageData ? JSON.parse(localStorageData) : [];
  });
  const history = useHistory();

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, [setTitle]);

  const clipboardShare = (type, id) => {
    let link;
    if (type === 'meal') {
      link = `http://localhost:3000/meals/${id}`;
    } else {
      link = `http://localhost:3000/drinks/${id}`;
    }
    copy(link);
    setClipBoardMsg(id);
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

  const handleNavigate = (type, id) => {
    if (type === 'meal') {
      return history.push(`/meals/${id}`);
    }
    history.push(`/drinks/${id}`);
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
                role="presentation"
                onClick={ () => handleNavigate(element.type, element.id) }
                data-testid={ `${index}-horizontal-image` }
                src={ element.image }
                alt={ element.name }
                key={ index }
                style={ {
                  width: '150px',
                  height: '150px',
                  marginBottom: '20px',
                } }
              />
              <h1
                data-testid={ `${index}-horizontal-top-text` }
              >
                {element.type === 'meal'
                  ? `${element.nationality} - ${element.category}`
                  : `${element.alcoholicOrNot} - ${element.category}`}
              </h1>
              <h2
                role="presentation"
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => handleNavigate(element.type, element.id) }
              >
                {element.name}
              </h2>
              <button
                onClick={ () => clipboardShare(element.type, element.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share icon"
                />
              </button>
              {
                clipBoardmsg === element.id
                && (
                  <p
                    data-testid="copy-clipboard"
                    className="clipboard-msg"
                  >
                    Link copied!
                  </p>)
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
