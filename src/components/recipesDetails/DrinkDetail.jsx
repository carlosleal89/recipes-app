import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function DrinkDetail({ drink, getIngredients, recommendation }) {
  // console.log(recommendation);
  const MEALS_LIST_MAX_LENGTH = 6;
  const { measures, ingredients } = getIngredients(drink)[0];
  const [clipBoardMsg, setClipBoardMsg] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const clipboardShare = (link) => {
    const clipboardLink = copy(link);
    console.log(clipboardLink);
    setClipBoardMsg(true);
  };

  const checkFavorites = () => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = localStorage.getItem('favoriteRecipes');
      const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
      const isFavoriteDrink = newFavoriteRecipesArray
        .some((recipe) => recipe.id === drink[0].idDrink);
      setIsFavorite(isFavoriteDrink);
    }
  };

  useEffect(() => {
    checkFavorites();
  }, [isFavorite]);

  const handleDrinkFavorites = (drinkFav) => {
    setIsFavorite(true);
    const newFavoriteDrink = {
      id: drinkFav.idDrink,
      type: 'drink',
      nationality: '',
      category: drinkFav.strCategory,
      alcoholicOrNot: drinkFav.strAlcoholic,
      name: drinkFav.strDrink,
      image: drinkFav.strDrinkThumb,
    };
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = localStorage.getItem('favoriteRecipes');
      const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
      newFavoriteRecipesArray.push(newFavoriteDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesArray));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavoriteDrink]));
    }
  };

  return (
    <div>
      { // photo, title and category
        drink.map(({
          idDrink,
          strDrinkThumb,
          strDrink,
          strAlcoholic,
        }) => (
          <div key={ idDrink } className="container__recipe-header">

            <img
              className="recipe-photo"
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt={ strDrink }
            />

            <h2
              className="recipe-title"
              data-testid="recipe-title"
            >
              { strDrink }
            </h2>

            <p
              className="recipe-category"
              data-testid="recipe-category"
            >
              { strAlcoholic }
            </p>
          </div>
        ))
      }

      <div className="container__recipe-ingredients">
        <h3>Ingredients</h3>
        <div className="container__measure-ingredient">
          <div className="column">
            { // Ingredients
              measures.map((measure, index) => (

                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { measure }
                </p>

              ))
            }
          </div>
          <div className="column">
            {
              ingredients.map((ingredient, index) => (

                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </p>

              ))
            }
          </div>
        </div>
      </div>

      { // Instructions
        drink.map(({
          idDrink,
          strInstructions,
        }) => (
          <div key={ idDrink } className="container__recipe-instructions">
            <h3>Instructions</h3>

            <p
              className="instructions"
              data-testid="instructions"
            >
              { strInstructions }
            </p>
          </div>
        ))
      }

      <div className="container__recipe-recommended">
        <h3 className="text-center">Recommended</h3>
        <Carousel>

          { // card - recommendation
            recommendation
              .slice(0, MEALS_LIST_MAX_LENGTH).map(({
                strMeal,
                strMealThumb,
              }, index) => (
                <Carousel.Item
                  className="recommendation-card"
                  data-testid={ `${index}-recommendation-card` }
                  key={ index }
                >
                  <img
                    className="d-block mx-auto"
                    alt={ strMeal }
                    src={ strMealThumb }
                  />
                  <p
                    className="text-center"
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {strMeal}
                  </p>
                </Carousel.Item>
              ))
          }
        </Carousel>
      </div>

      <div className="container__start-recipe-btn">
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
        <button
          className="share-recipe-btn"
          data-testid="share-btn"
          onClick={ () => clipboardShare(window.location.href) }
        >
          <img
            src={ shareIcon }
            alt="share icon"
          />
        </button>
        <button
          className="favorite-recipe-btn"
          onClick={ () => handleDrinkFavorites(drink[0]) }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
          />
        </button>
        {
          clipBoardMsg && <p className="clipboard-msg">Link copied!</p>
        }
      </div>

    </div>
  );
}

DrinkDetail.propTypes = {
  getIngredients: PropTypes.func.isRequired,
  drink: PropTypes.instanceOf(Object).isRequired,
  recommendation: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default DrinkDetail;
