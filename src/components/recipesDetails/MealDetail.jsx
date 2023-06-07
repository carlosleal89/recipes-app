import PropTypes from 'prop-types';
import React from 'react';
import YoutubePlayer from './YoutubePlayer';

function MealDetail({ meal, getIngredients }) {
  // console.log(meal);

  const { measures, ingredients } = getIngredients(meal)[0];
  console.log(measures, ingredients);

  const getIdYoutube = () => {
    const number = 11;
    const youtubeLink = meal[0].strYoutube;
    const id = youtubeLink.slice(youtubeLink.length - number);
    return id;
  };

  return (
    <div>
      { // photo, title and category
        meal.map(({
          idMeal,
          strMealThumb,
          strMeal,
          strCategory,
        }) => (
          <div key={ idMeal }>

            <img
              data-testid="recipe-photo"
              src={ strMealThumb }
              alt={ strMeal }
              width="300px"
            />

            <h2 data-testid="recipe-title">
              { strMeal }
            </h2>

            <p data-testid="recipe-category">
              { strCategory }
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
        meal.map(({
          idMeal,
          strInstructions,
        }) => (
          <div key={ idMeal }>
            <h3>Instructions</h3>

            <p data-testid="instructions">
              { strInstructions }
            </p>
          </div>
        ))
      }

      <YoutubePlayer youtubeId={ getIdYoutube() } />

    </div>
  );
}

MealDetail.propTypes = {
  getIngredients: PropTypes.func.isRequired,
  meal: PropTypes.instanceOf(Object).isRequired,
};

export default MealDetail;
