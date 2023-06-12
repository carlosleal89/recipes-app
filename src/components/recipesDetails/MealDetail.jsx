import PropTypes from 'prop-types';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import YoutubePlayer from './YoutubePlayer';

function MealDetail({ meal, getIngredients, recommendation }) {
  // console.log(recommendation);
  const DRINKS_LIST_MAX_LENGTH = 6;
  const { measures, ingredients } = getIngredients(meal)?.[0] ?? {};

  return (
    <div>
      { // photo, title and category
        meal?.map(({
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
        meal?.map(({
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

      <div className="container__recipe-recommended">
        <h3 className="text-center">Recommended</h3>
        <Carousel>

          { // card - recommendation
            recommendation && (
              recommendation
                .slice(0, DRINKS_LIST_MAX_LENGTH).map(({
                  strDrink,
                  strDrinkThumb,
                }, index) => (
                  <Carousel.Item
                    className="recommendation-card"
                    data-testid={ `${index}-recommendation-card` }
                    key={ index }
                  >
                    <img
                      className="d-block mx-auto"
                      alt={ strDrink }
                      src={ strDrinkThumb }
                    />
                    <p
                      className="text-center"
                      data-testid={ `${index}-recommendation-title` }
                    >
                      {strDrink}
                    </p>
                  </Carousel.Item>
                ))
            )
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
      </div>

    </div>
  );
}

MealDetail.propTypes = {
  getIngredients: PropTypes.func.isRequired,
  meal: PropTypes.instanceOf(Object).isRequired,
  recommendation: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default MealDetail;
