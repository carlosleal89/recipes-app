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

export default function RecipesInProgress() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clipBoardMsg, setClipBoardMsg] = useState(false);
  const location = useLocation();

  const { id } = useParams();

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
            data-testid="favorite-btn"
          // onClick={ }
          >
            Favorite
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
