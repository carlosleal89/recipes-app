import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeToggler from '../ThemeToggler';
import yellowShare from '../../images/yellowShare.svg';
import yellowHeart from '../../images/yellowHeart.svg';
import loginRedHeart from '../../images/loginRedHeart.svg';
import {
  handleMealFavorites,
  handleDrinkFavorites,
  checkFavorites } from '../../helpers/handleFavorites';

function PhotoAndTitle({ recipe }) {
  const location = useLocation();
  const [clipBoardMsg, setClipBoardMsg] = useState(false);
  const [isMealFavorite, setIsMealFavorite] = useState(false);
  const [isDrinkFavorite, setIsDrinkFavorite] = useState(false);

  const clipboardShare = (link) => {
    const SECONDS = 1500;
    navigator.clipboard.writeText(link);
    setClipBoardMsg(true);
    setTimeout(() => {
      setClipBoardMsg(false);
    }, SECONDS);
  };

  useEffect(() => {
    if (location.pathname.includes('/meals')) {
      checkFavorites(location, recipe, setIsMealFavorite);
    } else if (location.pathname.includes('/drinks')) {
      checkFavorites(location, recipe, setIsDrinkFavorite);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMealFavorite, isDrinkFavorite]);

  return (
    <div>
      {
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

            <div className="btn-theme-container">
              <ThemeToggler />
            </div>

            <button
              className="share-recipe-btn"
              data-testid="share-btn"
              onClick={ () => clipboardShare(window.location.href) }
            >
              <img
                src={ yellowShare }
                alt=""
              />
            </button>
            <button
              className="favorite-recipe-btn"
              onClick={ () => {
                if (location.pathname.includes('/meals')) {
                  handleMealFavorites(
                    recipe[0],
                    isMealFavorite,
                    setIsMealFavorite,
                    recipe,
                  );
                } else {
                  handleDrinkFavorites(
                    recipe[0],
                    isDrinkFavorite,
                    setIsDrinkFavorite,
                    recipe,
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
            {
              clipBoardMsg && <p className="clipboard-msg">Link copied!</p>
            }
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
