import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import '../../css/RecipeInProgress.css';

function IngredientsWithCheckboxes({ recipe, enableFinishBtn }) {
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
    const doneIngredients = JSON.parse(localStorage.getItem('doneIngredients'));
    const indexOfArrayIngredients = doneIngredients.indexOf(value);
    doneIngredients.splice(indexOfArrayIngredients, 1);
    localStorage.setItem('doneIngredients', JSON.stringify(doneIngredients));
  };

  const addLocalStorage = (value) => {
    if (localStorage.doneIngredients) {
      const doneIngredients = JSON.parse(localStorage.getItem('doneIngredients'));
      doneIngredients.push(value);
      localStorage.setItem('doneIngredients', JSON.stringify(doneIngredients));
    } else {
      const doneIngredients = [value];
      localStorage.setItem('doneIngredients', JSON.stringify(doneIngredients));
    }
  };

  const checkDoneIngredientes = () => {
    const allIngredients = document.querySelectorAll('.done-ingredient');
    const doneIngredients = JSON.parse(localStorage.getItem('doneIngredients'));
    allIngredients.forEach((ingredient) => {
      if (doneIngredients.includes(ingredient.firstChild.value)) {
        ingredient.className = 'text';
        ingredient.firstChild.checked = true;
      }
    });
  };

  const handleFinishRecipeButton = () => {
    const checkboxInput = document.querySelectorAll('.checked');
    const checkboxInputArray = Array.from(checkboxInput);
    const isChecked = checkboxInputArray.every((checkBox) => checkBox.checked);
    enableFinishBtn(isChecked);
  };

  const handleChange = (target) => {
    handleFinishRecipeButton();
    if (target.checked) {
      addLocalStorage(target.value);
      target.parentNode.className = 'text';
    } else {
      removeLocalStorage(target.value);
      target.parentNode.className = '';
    }
  };

  const { measures, ingredients } = getMeasuresAndIngredients(recipe)[0];

  useEffect(() => {
    if (localStorage.doneIngredients) {
      checkDoneIngredientes();
    }
  }, []);

  return (
    <div className="checkboxContainer">
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
                data-testid={ `${index}-ingredient-checkbox` }
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
  enableFinishBtn: PropTypes.func,
}.isRequired;

export default IngredientsWithCheckboxes;
