import PropTypes from 'prop-types';
import React from 'react';

function DrinkDetail({ drink, getIngredients }) {
  // console.log(drink);

  const { measures, ingredients } = getIngredients(drink)[0];

  return (
    <div>
      { // photo, title and category
        drink.map(({
          idDrink,
          strDrinkThumb,
          strDrink,
          strAlcoholic,
        }) => (
          <div key={ idDrink }>

            <img
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt={ strDrink }
              width="300px"
            />

            <h2 data-testid="recipe-title">
              { strDrink }
            </h2>

            <p data-testid="recipe-category">
              { strAlcoholic }
            </p>
          </div>
        ))
      }

      <h3>Ingredients</h3>
      <div className="container__recipes-details--ingr">
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

      { // Instructions
        drink.map(({
          idDrink,
          strInstructions,
        }) => (
          <div key={ idDrink }>
            <h3>Instructions</h3>

            <p data-testid="instructions">
              { strInstructions }
            </p>
          </div>
        ))
      }

    </div>
  );
}

DrinkDetail.propTypes = {
  getIngredients: PropTypes.func.isRequired,
  drink: PropTypes.instanceOf(Object).isRequired,
};

export default DrinkDetail;
