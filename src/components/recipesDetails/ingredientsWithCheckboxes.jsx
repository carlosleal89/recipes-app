import PropTypes from 'prop-types';
import React from 'react';
import '../../css/RecipeInProgress.css';

function IngredientsWithCheckboxes({ recipe }) {
  const getMeasuresAndIngredients = (drinkOrMeal) => {
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

  const handleChange = (target) => {
    if (target.checked) {
      target.parentNode.className = 'text';
    } else {
      target.parentNode.className = '';
    }
  };

  const { measures, ingredients } = getMeasuresAndIngredients(recipe)[0];

  return (
    <div>
      {
        ingredients.map((ingredient, index) => (
          <div key={ index }>
            <label
              htmlFor={ `ingredient${index}` }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                className="checked"
                type="checkbox"
                id={ `ingredient${index}` }
                onChange={ ({ target }) => handleChange(target) }
              />
              <span>{`${measures[index]} ${ingredient}` }</span>
            </label>
          </div>
        ))
      }
    </div>
  );
}

IngredientsWithCheckboxes.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};

export default IngredientsWithCheckboxes;
