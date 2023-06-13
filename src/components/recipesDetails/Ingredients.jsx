import PropTypes from 'prop-types';
import React from 'react';

function Ingredients({ recipe }) {
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
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};

export default Ingredients;
