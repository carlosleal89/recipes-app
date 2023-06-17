import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import Recommendation from './Recommendation';
// import shareIcon from '../../images/shareIcon.svg';
// import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import PhotoAndTitle from './PhotoAndTitle';
import ButtonStartContinue from './ButtonStartContinue';
import yellowShare from '../../images/yellowShare.svg';
import yellowHeart from '../../images/yellowHeart.svg';
import loginRedHeart from '../../images/loginRedHeart.svg';

function DrinkDetail({ drink, recommendation }) {
  const [clipBoardMsg, setClipBoardMsg] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const clipboardShare = (link) => {
    const SECONDS = 1500;
    copy(link);
    setClipBoardMsg(true);
    setTimeout(() => {
      setClipBoardMsg(false);
    }, SECONDS);
  };

  const checkFavorites = () => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = localStorage.getItem('favoriteRecipes');
      const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
      const isFavoriteDrink = newFavoriteRecipesArray
        .some((recipe) => recipe.id === drink[0].idDrink);
      setIsFavorite(isFavoriteDrink);
    }
  };

  useEffect(() => {
    checkFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorite]);

  const handleDrinkFavorites = (drinkFav) => {
    if (!isFavorite) {
      setIsFavorite(true);
      const newFavoriteDrink = {
        id: drinkFav.idDrink,
        type: 'drink',
        nationality: '',
        category: drinkFav.strCategory,
        alcoholicOrNot: drinkFav.strAlcoholic,
        name: drinkFav.strDrink,
        image: drinkFav.strDrinkThumb,
      };
      if (localStorage.favoriteRecipes) {
        const favoriteRecipes = localStorage.getItem('favoriteRecipes');
        const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
        newFavoriteRecipesArray.push(newFavoriteDrink);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesArray));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newFavoriteDrink]));
      }
    } else {
      setIsFavorite(false);
      const favoriteRecipes = localStorage.getItem('favoriteRecipes');
      const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
      const favoriteArrayRemoved = newFavoriteRecipesArray
        .filter((recipe) => recipe.id !== drink[0].idDrink);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(favoriteArrayRemoved));
    }
  };

  return (
    <div>
      <PhotoAndTitle recipe={ drink } />

      <Ingredients recipe={ drink } />

      <Instructions recipe={ drink } />

      <Recommendation recommendation={ recommendation } />

      <div className="container__start-recipe-btn">

        <ButtonStartContinue recipe={ drink } />

        <button
          className="share-recipe-btn"
          data-testid="share-btn"
          onClick={ () => clipboardShare(window.location.href) }
        >
          <img
            src={ yellowShare }
            alt="share icon"
          />
        </button>
        <button
          className="favorite-recipe-btn"
          onClick={ () => handleDrinkFavorites(drink[0]) }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? loginRedHeart : yellowHeart }
            alt="favorite icon"
          />
        </button>
        {
          clipBoardMsg && <p className="clipboard-msg">Link copied!</p>
        }
      </div>

    </div>
  );
}

DrinkDetail.propTypes = {
  drink: PropTypes.instanceOf(Object).isRequired,
  recommendation: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default DrinkDetail;
