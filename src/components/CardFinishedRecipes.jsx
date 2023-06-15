import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function CardFinishedRecipes({ recipe, index }) {
  console.log(recipe);
  const [clipBoardmsg, setClipBoardMsg] = useState(false);

  const clipboardShare = (link) => {
    const SECONDS = 1500;
    copy(link);
    setClipBoardMsg(true);
    setTimeout(() => {
      setClipBoardMsg(false);
    }, SECONDS);
  };

  return (
    <div>
      <img
        alt="recipe"
        src={ recipe.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {recipe.category && recipe.nationality
          ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        { recipe.name }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { recipe.doneDate }
      </p>

      { recipe.tags
      && recipe.tags.splice(0, 2).map((tag) => (
        <p
          data-testid={ `${index}-${tag}-horizontal-tag` }
          key={ index }
        >
          {tag}
        </p>
      ))}

      <button
        className="share-recipe-btn"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => clipboardShare(window.location.href) }
        src={ shareIcon }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
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

CardFinishedRecipes.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardFinishedRecipes;
