import PropTypes from 'prop-types';
import React from 'react';

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
            />
            <span className="text">{`${measures[index]} ${ingredient}` }</span>
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
