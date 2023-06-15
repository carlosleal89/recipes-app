import PropTypes from 'prop-types';
import React from 'react';
import '../../css/RecipeInProgress.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function IngredientsWithCheckboxes({ recipe }) {
  const { id } = useParams();
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

  const handleLocalStorage = (value) => {
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { ingredients, measures } = inProgressRecipe.meals[id][0];
    const indexOfArrayIngredients = ingredients.indexOf(value);
    ingredients.splice(indexOfArrayIngredients, 1);
    measures.splice(indexOfArrayIngredients, 1);
    const newInprogressRecipe = {
      meals: {
        [id]: [{
          ingredients,
          measures,
        }],
      },
    };
    console.log(newInprogressRecipe);
    // console.log(ingredients);
  };

  const handleChange = (target) => {
    handleLocalStorage(target.value);
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
                value={ ingredient }
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
