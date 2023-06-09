import PropTypes from 'prop-types';
import React from 'react';
import YoutubePlayer from './YoutubePlayer';

function MealDetail({ meal, getIngredients }) {
  // console.log(meal);

  const { measures, ingredients } = getIngredients(meal)[0];
  // console.log(measures, ingredients);

  return (
    <div>
      { // photo, title and category
        meal.map(({
          idMeal,
          strMealThumb,
          strMeal,
          strCategory,
        }) => (
          <div key={ idMeal } className="container__recipe-header">

            <img
              className="recipe-photo"
              data-testid="recipe-photo"
              src={ strMealThumb }
              alt={ strMeal }
            />

            <h2
              className="recipe-title"
              data-testid="recipe-title"
            >
              { strMeal }
            </h2>

            <p
              className="recipe-category"
              data-testid="recipe-category"
            >
              { strCategory }
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
        meal.map(({
          idMeal,
          strInstructions,
          strYoutube,
        }) => (
          <div key={ idMeal } className="container__recipe-instructions">
            <h3>Instructions</h3>

            <p
              className="instructions"
              data-testid="instructions"
            >
              { strInstructions }
            </p>

            <YoutubePlayer youtubeLink={ strYoutube } />
          </div>
        ))
      }

    </div>
  );
}

MealDetail.propTypes = {
  getIngredients: PropTypes.func.isRequired,
  meal: PropTypes.instanceOf(Object).isRequired,
};

export default MealDetail;
