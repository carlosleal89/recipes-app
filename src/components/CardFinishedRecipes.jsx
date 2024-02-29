/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import yellowShare from '../images/yellowShare.svg';
import yellowHeart from '../images/yellowHeart.svg';
import loginRedHeart from '../images/loginRedHeart.svg';
import {
  handleFavorites,
  checkFavorites,
} from '../helpers/handleFavorites';
import '../css/FavoriteRecipes.css';
// import '../css/CardFinishedRecipes.css';

function CardFinishedRecipes({ recipe, index }) {
  const [clipBoardmsg, setClipBoardMsg] = useState(false);
  const [isMealFavorite, setIsMealFavorite] = useState(false);
  const [isDrinkFavorite, setIsDrinkFavorite] = useState(false);

  const location = useLocation();

  const clipboardShare = (link) => {
    const SECONDS = 1500;
    copy(link);
    setClipBoardMsg(true);
    setTimeout(() => {
      setClipBoardMsg(false);
    }, SECONDS);
  };

  useEffect(() => {
    checkFavorites(recipe, setIsMealFavorite);
    checkFavorites(recipe, setIsDrinkFavorite);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMealFavorite, isDrinkFavorite]);

  return (
    <>
      <div className="container__recipe">
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <img
            alt="recipe"
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            className="favorite-recipe-img"
          />
        </Link>
        <h3
          role="presentation"
          className="favorite-recipe-name"
          data-testid={ `${index}-horizontal-name` }
        >
          { recipe.name }
        </h3>
        <h5
          className="card-done-recipe-info"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {recipe.category && recipe.nationality ? (
            <>
              <span>{recipe.nationality}</span>
              <br />
              <span>{recipe.category}</span>
            </>
          ) : (
            <>
              <span>{recipe.alcoholicOrNot}</span>
              <br />
              <span>{recipe.category}</span>
            </>
          )}
        </h5>
        <div className="container__favorite-buttons bottom-aligned">
          <button
            className="recipe-share-btn"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => clipboardShare(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }
          >
            <img
              src={ yellowShare }
              alt="share icon"
            />
          </button>
          <button
            className="recipe-favorite-btn"
            onClick={ () => {
              if (recipe.type === 'meal') {
                handleFavorites(
                  recipe,
                  isMealFavorite,
                  setIsMealFavorite,
                );
              } else {
                handleFavorites(
                  recipe,
                  isDrinkFavorite,
                  setIsDrinkFavorite,
                );
              }
            } }
          >
            <img
              data-testid="favorite-btn"
              src={ isMealFavorite || isDrinkFavorite ? loginRedHeart : yellowHeart }
              alt="favorite icon"
            />
          </button>
        </div>
        { recipe.tags
    && recipe.tags.splice(0, 2).map((tag, tagIndex) => (
      <p
        className="card-done-recipe-info"
        data-testid={ `${index}-${tag}-horizontal-tag` }
        key={ `${index}${tag}${tagIndex}` }
      >
        {tag}
      </p>
    ))}
        {
          location.pathname === '/done-recipes'
          // eslint-disable-next-line operator-linebreak
          &&
            <p
              className="card-done-recipe-info"
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Finalizado em: ${recipe.doneDate}`}
            </p>
        }
      </div>
      {
        clipBoardmsg && <p className="clipboard-message">Link copied!</p>
      }
    </>
  );
}

CardFinishedRecipes.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardFinishedRecipes;
