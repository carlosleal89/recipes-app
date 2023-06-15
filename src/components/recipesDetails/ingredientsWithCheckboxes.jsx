import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import '../../css/RecipeInProgress.css';
import { useParams, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function IngredientsWithCheckboxes({ recipe }) {
  const { id } = useParams();
  const location = useLocation();
  const [routeName, setRouteName] = useState('');

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

  const removeLocalStorage = (value) => {
    console.log(routeName);
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { ingredients, measures } = inProgressRecipe[routeName][id][0];
    const indexOfArrayIngredients = ingredients.indexOf(value);
    ingredients.splice(indexOfArrayIngredients, 1);
    measures.splice(indexOfArrayIngredients, 1);
    const newInprogressRecipe = {
      [routeName]: {
        [id]: [{
          ingredients,
          measures,
        }],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInprogressRecipe));
  };

  const addLocalStorage = (value) => {
    console.log(routeName);
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { ingredients, measures } = inProgressRecipe[routeName][id][0];
    ingredients.push(value);
    const newInprogressRecipe = {
      [routeName]: {
        [id]: [{
          ingredients,
          measures,
        }],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInprogressRecipe));
  };

  const checkDoneIngredientes = () => {
    const doneIngredients = document.querySelectorAll('.done-ingredient');
    doneIngredients[0].className = 'text';
    doneIngredients[0].firstChild.checked = true;
    const { value } = doneIngredients[0].firstChild;
    removeLocalStorage(value);
    console.log(value);
  };

  const handleChange = (target) => {
    if (target.checked) {
      removeLocalStorage(target.value);
      target.parentNode.className = 'text';
    } else {
      addLocalStorage(target.value);
      target.parentNode.className = '';
    }
  };

  const { measures, ingredients } = getMeasuresAndIngredients(recipe)[0];

  useEffect(() => {
    if (location.pathname.startsWith('/meals/')) {
      setRouteName('meals');
    } else setRouteName('drinks');
    checkDoneIngredientes();
  }, []);

  return (
    <div>
      {
        ingredients.map((ingredient, index) => (
          <div key={ index }>
            <label
              className="done-ingredient"
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
