import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Recommendation from './Recommendation';
import YoutubePlayer from './YoutubePlayer';
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

function MealDetail({ meal, recommendation }) {
  const [clipBoardMsg, setClipBoardMsg] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const clipboardShare = (link) => {
    const SECONDS = 1500;
    navigator.clipboard.writeText(link);
    setClipBoardMsg(true);
    setTimeout(() => {
      setClipBoardMsg(false);
    }, SECONDS);
  };

  const checkFavorites = () => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = localStorage.getItem('favoriteRecipes');
      const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
      const isFavoriteMeal = newFavoriteRecipesArray
        .some((recipe) => recipe.id === meal[0].idMeal);
      setIsFavorite(isFavoriteMeal);
    }
  };

  useEffect(() => {
    checkFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorite]);

  const handleMealFavorites = (mealFav) => {
    if (!isFavorite) {
      setIsFavorite(true);
      const newFavoriteMeal = {
        id: mealFav.idMeal,
        type: 'meal',
        nationality: mealFav.strArea,
        category: mealFav.strCategory,
        alcoholicOrNot: '',
        name: mealFav.strMeal,
        image: mealFav.strMealThumb,
      };
      if (localStorage.favoriteRecipes) {
        const favoriteRecipes = localStorage.getItem('favoriteRecipes');
        const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
        newFavoriteRecipesArray.push(newFavoriteMeal);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesArray));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newFavoriteMeal]));
      }
    } else {
      setIsFavorite(false);
      const favoriteRecipes = localStorage.getItem('favoriteRecipes');
      const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
      const favoriteArrayRemoved = newFavoriteRecipesArray
        .filter((recipe) => recipe.id !== meal[0].idMeal);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(favoriteArrayRemoved));
    }
  };

  return (
    <div>
      <PhotoAndTitle recipe={ meal } />

      <Ingredients recipe={ meal } />

      <Instructions recipe={ meal } />

      <YoutubePlayer youtubeLink={ meal[0].strYoutube } />

      <Recommendation recommendation={ recommendation } />

      <div className="container__start-recipe-btn">

        <ButtonStartContinue recipe={ meal } />

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
          onClick={ () => handleMealFavorites(meal[0]) }
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

MealDetail.propTypes = {
  meal: PropTypes.instanceOf(Object).isRequired,
  recommendation: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default MealDetail;
