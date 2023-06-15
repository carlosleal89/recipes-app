import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

function ButtonStartContinue({ recipe }) {
  const [isStarted, setIsStarted] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();

  const getIngredients = (drinkOrMeal) => {
    const ingredientsList = drinkOrMeal.map((obj) => {
      const measures = Object.keys(obj)
        .filter((key) => key.startsWith('strMeasure') && obj[key])
        .map((key) => obj[key]);

      const ingredients = Object.keys(obj)
        .filter((key) => key.startsWith('strIngredient') && obj[key])
        .map((key) => obj[key]);

      return {
        measures,
        ingredients,
      };
    });
    return ingredientsList;
  };

  const checkRecipeInProgress = () => {
    if (
      (location.pathname === `/drinks/${id}` || location.pathname === `/meals/${id}`)
      && localStorage.inProgressRecipes
    ) {
      const progressRecipes = localStorage.getItem('inProgressRecipes');
      const newProgressRecipes = JSON.parse(progressRecipes);

      const inProgressKey = location.pathname.includes('drinks') ? 'drinks' : 'meals';

      if (newProgressRecipes[inProgressKey] && newProgressRecipes[inProgressKey][id]) {
        setIsStarted(true);
      }
    }
  };

  const handleClickStartRecipe = (obj) => {
    if (location.pathname === `/drinks/${id}`) {
      if (!isStarted) {
        const recipeInProgress = {
          drinks: {
            [obj.idDrink]: [getIngredients(recipe)[0]],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
        history.push(`/drinks/${id}/in-progress`);
      } else history.push(`/drinks/${id}/in-progress`);
    }

    if (location.pathname === `/meals/${id}`) {
      if (!isStarted) {
        const recipeInProgress = {
          meals: {
            [obj.idMeal]: [getIngredients(recipe)[0]],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
        history.push(`/meals/${id}/in-progress`);
      } else history.push(`/meals/${id}/in-progress`);
    }
  };

  useEffect(() => {
    checkRecipeInProgress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container__start-recipe-btn">
      <button
        className="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => handleClickStartRecipe(recipe[0]) }
      >
        {isStarted ? 'Continue Recipe' : 'Start Recipe' }
      </button>
    </div>
  );
}

ButtonStartContinue.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};

export default ButtonStartContinue;
