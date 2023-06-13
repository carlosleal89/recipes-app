import PropTypes from 'prop-types';
import React from 'react';

function Instructions({ recipe }) {
  return (
    <div>
      { // Instructions
        recipe.map((rec) => (
          <div
            key={ rec.idDrink || rec.idMeal }
            className="container__recipe-instructions"
          >
            <h3>Instructions</h3>

            <p
              className="instructions"
              data-testid="instructions"
            >
              { rec.strInstructions }
            </p>
          </div>
        ))
      }
    </div>
  );
}

Instructions.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};

export default Instructions;
