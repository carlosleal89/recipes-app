import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchMealsById, fetchDrinksById } from '../helpers/API_URL';
import PhotoAndTitle from '../components/recipesDetails/PhotoAndTitle';
import Loading from '../components/recipesDetails/Loading';
import shareIcon from '../images/shareIcon.svg';
import Instructions from '../components/recipesDetails/Instructions';
import '../css/RecipeInProgress.css';
import IngredientsWithCheckboxes
  from '../components/recipesDetails/ingredientsWithCheckboxes';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipesInProgress() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clipBoardMsg, setClipBoardMsg] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const location = useLocation();

  const { id } = useParams();

  // const checkFavorites = () => {
  //   if (localStorage.favoriteRecipes) {
  //     const favoriteRecipes = localStorage.getItem('favoriteRecipes');
  //     const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
  //     const isFavoriteRecipe = newFavoriteRecipesArray
  //       .some((recipe) => recipe.id === recipes.idMeal);
  //     setIsFavorite(isFavoriteRecipe);
  //   }
  //   // console.log(isFavoriteRecipe);
  //   // setIsFavorite(true);
  // };

  // useEffect(() => {
  //   checkFavorites();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isFavorite]);

  const handleMealFavorites = (recipeFav) => {
    if (!isFavorite) {
      setIsFavorite(true);
      const newFavoriteMeal = {
        id: recipeFav.idMeal || recipeFav.idDrink,
        type: location.pathname.includes('/meals') ? 'meal' : 'drink',
        nationality: recipeFav.strArea || '',
        category: recipeFav.strCategory,
        alcoholicOrNot: recipeFav.strAlcoholic || '',
        name: recipeFav.strMeal || recipeFav.strDrink,
        image: recipeFav.strMealThumb || recipeFav.strDrinkThumb,
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
            className=""
            data-testid="share-btn"
            onClick={ clipboardShare }
          >
            <img
              src={ shareIcon }
              alt="share icon"
            />
          </button>

          <button
            className="favorite-recipe-btn"
            onClick={ () => handleMealFavorites(recipes[0]) }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="favorite icon"
            />
          </button>

          {
            clipBoardMsg && <span>Link copied!</span>
          }

          <IngredientsWithCheckboxes recipe={ recipes } />
          <Instructions recipe={ recipes } />
          <button
            data-testid="finish-recipe-btn"
          // onClick={ }
          >
            Finish recipe
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
