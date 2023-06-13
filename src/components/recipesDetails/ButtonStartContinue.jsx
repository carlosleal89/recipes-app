import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function ButtonStartContinue({ recipe }) {
  const [isStarted, setIsStarted] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  // const ckeckRecipeInProgress = () => {
  //   if (localStorage.inProgressRecipes) {
  //     const progressRecipes = localStorage.getItem('inProgressRecipes');
  //     const newProgressRecipes = JSON.parse(progressRecipes);
  //     if (newProgressRecipes.drinks && newProgressRecipes.drinks[id]) {
  //       setIsStarted(true);
  //     }
  //   } else {
  //     localStorage.inProgressRecipes = {};
  //   }
  // };

  const handleClickStartRecipe = ({ idDrink }) => {
    const recipeInProgress = {
      drinks: {
        [idDrink]: [getIngredients(recipe)[0]],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
    history.push(`/drinks/${id}/in-progress`);
    setIsStarted('teste'); // apagar
  };

  useEffect(() => {
    // ckeckRecipeInProgress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container__start-recipe-btn">
      <button
        className="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => handleClickStartRecipe(recipe[0]) }
      >
        {isStarted ? 'Continue Recipe' : 'Start Recipe' }
      </button>
    </div>
  );
}

ButtonStartContinue.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};

export default ButtonStartContinue;
