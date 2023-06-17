/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import '../css/CardFinishedRecipes.css';

function CardFinishedRecipes({ recipe, index }) {
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
      <div className="card-recipe">
        <div className="image-recipe">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              alt="recipe"
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              className="recipe-image"
            />
          </Link>
        </div>
        <div className="recipe-info">
          <h6
            className="title-recipes"
            data-testid={ `${index}-horizontal-name` }
          >
            { recipe.name }
            <div>

              <button
                className="share-recipe-button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => clipboardShare(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }
                src={ shareIcon }
              >
                <img
                  src={ shareIcon }
                  alt="share icon"
                />
              </button>
            </div>
          </h6>
          { recipe.tags
      && recipe.tags.splice(0, 2).map((tag) => (
        <p
          className="card-done-recipe-info"
          data-testid={ `${index}-${tag}-horizontal-tag` }
          key={ index }
        >
          {tag}
        </p>
      ))}
          <p
            className="card-done-recipe-info"
            data-testid={ `${index}-horizontal-top-text` }
          >
            {recipe.category && recipe.nationality
              ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
          </p>
          <p
            className="card-done-recipe-info"
            data-testid={ `${index}-horizontal-done-date` }
          >
            { recipe.doneDate }
          </p>
        </div>
      </div>
      {
        clipBoardmsg && <p className="clipboard-message">Link copied!</p>
      }
    </div>
  );
}

CardFinishedRecipes.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardFinishedRecipes;
