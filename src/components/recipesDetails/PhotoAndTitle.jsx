import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ThemeToggler from '../ThemeToggler';
import yellowShare from '../../images/yellowShare.svg';
import yellowHeart from '../../images/yellowHeart.svg';
import loginRedHeart from '../../images/loginRedHeart.svg';

function PhotoAndTitle({ recipe }) {
  const [clipBoardMsg, setClipBoardMsg] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const clipboardShare = (link) => {
    const SECONDS = 1500;
    navigator.clipboard.writeText(link);
    setClipBoardMsg(true);
    setTimeout(() => {
      setClipBoardMsg(false);
    }, SECONDS);
  };

  const checkFavorites = () => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = localStorage.getItem('favoriteRecipes');
      const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
      const isFavoriteMeal = newFavoriteRecipesArray
        .some((recipeItem) => recipeItem.id === recipe[0].idMeal);
      setIsFavorite(isFavoriteMeal);
    }
  };

  useEffect(() => {
    checkFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorite]);

  const handleMealFavorites = (mealFav) => {
    if (!isFavorite) {
      setIsFavorite(true);
      const newFavoriteMeal = {
        id: mealFav.idMeal,
        type: 'meal',
        nationality: mealFav.strArea,
        category: mealFav.strCategory,
        alcoholicOrNot: '',
        name: mealFav.strMeal,
        image: mealFav.strMealThumb,
      };
      if (localStorage.favoriteRecipes) {
        const favoriteRecipes = localStorage.getItem('favoriteRecipes');
        const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
        newFavoriteRecipesArray.push(newFavoriteMeal);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesArray));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newFavoriteMeal]));
      }
    } else {
      setIsFavorite(false);
      const favoriteRecipes = localStorage.getItem('favoriteRecipes');
      const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
      const favoriteArrayRemoved = newFavoriteRecipesArray
        .filter((recipeItem) => recipeItem.id !== recipe[0].idMeal);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(favoriteArrayRemoved));
    }
  };

  return (
    <div>
      {
        recipe.map((rec) => (
          <div
            key={ rec.idDrink || rec.idMeal }
            className="container__recipe-header"
          >

            <img
              className="recipe-photo"
              data-testid="recipe-photo"
              src={ rec.strDrinkThumb || rec.strMealThumb }
              alt={ rec.strDrink || rec.strMeal }
            />

            <div className="btn-theme-container">
              <ThemeToggler />
            </div>

            <button
              className="share-recipe-btn"
              data-testid="share-btn"
              onClick={ () => clipboardShare(window.location.href) }
            >
              <img
                src={ yellowShare }
                alt=""
              />
            </button>
            <button
              className="favorite-recipe-btn"
              onClick={ () => handleMealFavorites(recipe[0]) }
            >
              <img
                data-testid="favorite-btn"
                src={ isFavorite ? loginRedHeart : yellowHeart }
                alt="favorite icon"
              />
            </button>

            <h2
              className="recipe-title"
              data-testid="recipe-title"
            >
              { rec.strDrink || rec.strMeal }
            </h2>

            <p
              className="recipe-category"
              data-testid="recipe-category"
            >
              { rec.strAlcoholic || rec.strCategory }
            </p>
            {
              clipBoardMsg && <p className="clipboard-msg">Link copied!</p>
            }
          </div>
        ))
      }
    </div>
  );
}

PhotoAndTitle.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};

export default PhotoAndTitle;
