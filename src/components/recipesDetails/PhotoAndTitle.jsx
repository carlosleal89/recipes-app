import PropTypes from 'prop-types';
import React from 'react';

function PhotoAndTitle({ recipe }) {
  return (
    <div>
      { // photo, title and category
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
