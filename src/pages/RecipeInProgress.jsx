import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { fetchMealsById, fetchDrinksById } from '../helpers/API_URL';
import PhotoAndTitle from '../components/recipesDetails/PhotoAndTitle';
import Loading from '../components/recipesDetails/Loading';
import Instructions from '../components/recipesDetails/Instructions';
import '../css/RecipeInProgress.css';
import IngredientsWithCheckboxes
  from '../components/recipesDetails/ingredientsWithCheckboxes';
import yellowShare from '../images/yellowShare.svg';
import yellowHeart from '../images/yellowHeart.svg';
import loginRedHeart from '../images/loginRedHeart.svg';

export default function RecipesInProgress() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clipBoardMsg, setClipBoardMsg] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [enableFinishBtn, setEnableFinishBtn] = useState(false);
  const history = useHistory();

  const location = useLocation();

  const { id } = useParams();

  const handleMealFavorites = (recipeDone) => {
    if (!isFavorite) {
      setIsFavorite(true);
      const newFavoriteMeal = {
        id: recipeDone.idMeal || recipeDone.idDrink,
        type: location.pathname.includes('/meals') ? 'meal' : 'drink',
        nationality: recipeDone.strArea || '',
        category: recipeDone.strCategory,
        alcoholicOrNot: recipeDone.strAlcoholic || '',
        name: recipeDone.strMeal || recipeDone.strDrink,
        image: recipeDone.strMealThumb || recipeDone.strDrinkThumb,
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
      const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const removedId = localStorageData.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removedId));
      setIsFavorite(false);
    }
  };

  const clipboardShare = () => {
    if (location.pathname === `/meals/${id}/in-progress`) {
      navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    }
    if (location.pathname === `/drinks/${id}/in-progress`) {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    }
    const SECONDS = 1500;
    setClipBoardMsg(true);
    setTimeout(() => {
      setClipBoardMsg(false);
    }, SECONDS);
  };

  const handleFinish = (recipeDone) => {
    const finishedRecipe = {
      id: recipeDone.idMeal || recipeDone.idDrink,
      type: location.pathname.includes('/meals') ? 'meal' : 'drink',
      nationality: recipeDone.strArea || '',
      category: recipeDone.strCategory,
      alcoholicOrNot: recipeDone.strAlcoholic || '',
      name: recipeDone.strMeal || recipeDone.strDrink,
      image: recipeDone.strMealThumb || recipeDone.strDrinkThumb,
      doneDate: (new Date()).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      tags: recipeDone.strTags ? recipeDone.strTags.split(',') : [],
    };
    if (localStorage.doneRecipes) {
      const doneRecipes = localStorage.getItem('doneRecipes');
      const newDoneRecipesArray = JSON.parse(doneRecipes);
      const teste = ([...newDoneRecipesArray, finishedRecipe]);
      localStorage.setItem('doneRecipes', JSON.stringify(teste));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([finishedRecipe]));
    }
    history.push('/done-recipes');
  };

  useEffect(() => {
    const getMealOrDrink = async () => {
      if (location.pathname === `/meals/${id}/in-progress`) {
        const mealById = await fetchMealsById(id);
        setRecipes(mealById.meals);
      }
      if (location.pathname === `/drinks/${id}/in-progress`) {
        const drinkById = await fetchDrinksById(id);
        setRecipes(drinkById.drinks);
      }
      setIsLoading(false);
    };
    getMealOrDrink();

    const checkFavorites = () => {
      const favoriteRecipes = localStorage.getItem('favoriteRecipes');
      if (favoriteRecipes) {
        const parsedFavoriteRecipes = JSON.parse(favoriteRecipes);
        const isFavoriteDrink = parsedFavoriteRecipes.some(
          (recipe) => recipe.id === id,
        );
        setIsFavorite(isFavoriteDrink);
      }
    };
    checkFavorites();
  }, [id, location.pathname]);

  return (
    <div>
      { !isLoading ? (
        <div>
          <PhotoAndTitle recipe={ recipes } />
          <button
            className="share-recipe-btn"
            data-testid="share-btn"
            onClick={ clipboardShare }
          >
            <img
              src={ yellowShare }
              alt=""
            />
          </button>

          <button
            className="favorite-recipe-btn"
            onClick={ () => handleMealFavorites(recipes[0]) }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? loginRedHeart : yellowHeart }
              alt="favorite icon"
            />
          </button>

          {
            clipBoardMsg && <span className="clipboard-msg">Link copied!</span>
          }
          <h1 className="ingredient">Ingredients</h1>
          <IngredientsWithCheckboxes
            recipe={ recipes }
            enableFinishBtn={ setEnableFinishBtn }
          />
          <Instructions recipe={ recipes } />
          <div className="finish-btn-box">
            <button
              data-testid="finish-recipe-btn"
              onClick={ () => handleFinish(recipes[0]) }
              disabled={ !enableFinishBtn }
              className="finish-btn"
            >
              Finish Recipe
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
