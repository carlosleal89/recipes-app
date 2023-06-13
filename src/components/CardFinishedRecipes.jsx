import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import oneMeal from '../mocks/oneMeal';
import oneDrink from '../mocks/oneDrink';

function CardFinishedRecipes() {
  const [clipBoardmsg, setClipBoardMsg] = useState(false);

  const tagName = 'Pasta';
  const index = 0;

  const clipboardShare = (link) => {
    copy(link);
    setClipBoardMsg(true);
  };

  return (
    <div>
      <img
        alt="recipe"
        src={ oneMeal.meals[0].strMealThumb }
        data-testid={ `${index}-horizontal-image` }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${oneMeal.meals[0].strCategory} - ${oneMeal.meals[0].strArea}`
        || `${oneDrink.drinks[0].strAlcoholic}` }

      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        { oneMeal.meals[0].strMeal }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { (new Date()).toLocaleDateString() }
      </p>
      <p
        data-testid={ `${index}-${tagName}-horizontal-tag` }
      >
        { oneMeal.meals[0].strTags }
      </p>
      <button
        className="share-recipe-btn"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => clipboardShare(window.location.href) }
      >
        <img
          src={ shareIcon }
          alt="share icon"
        />
      </button>
      {
        clipBoardmsg && <p className="clipboard-msg">Link copied!</p>
      }
    </div>
  );
}

export default CardFinishedRecipes;
