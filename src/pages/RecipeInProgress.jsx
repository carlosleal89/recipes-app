import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchMealsById, fetchDrinksById } from '../helpers/API_URL';
import PhotoAndTitle from '../components/recipesDetails/PhotoAndTitle';
import Loading from '../components/recipesDetails/Loading';
import shareIcon from '../images/shareIcon.svg';
import Instructions from '../components/recipesDetails/Instructions';
import '../css/RecipeInProgress.css';
import Ingredients from '../components/recipesDetails/Ingredients';

export default function RecipesInProgress() {
  const [ingredientState, setIngredientState] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const { id } = useParams();
  const atualRecipe = localStorage.getItem('inProgressRecipes');
  const newRecipe = JSON.parse(atualRecipe) || [];

  const getMeasuresAndIngredients = async (drinkOrMeal) => {
    const ingredientsList = drinkOrMeal.map((obj) => {
      const measures = Object.keys(obj)
        .filter((key) => key.startsWith('strMeasure') && obj[key])
        .map((key) => obj[key]);

      const ingredients = Object.keys(obj)
        .filter((key) => key.startsWith('strIngredient') && obj[key])
        .map((key) => obj[key]);

      return {
        measures,
        ingredients,
      };
    });
    return ingredientsList;
  };

  useEffect(() => {
    // if (tst) {
    //   setIngredientState(tst);
    // }
    const getMealOrDrink = async () => {
      if (location.pathname === `/meals/${id}/in-progress`) {
        // const ingredients = newRecipe.meals[id];
        // setIngredientState(ingredients[0]);
        const mealById = await fetchMealsById(id);
        setRecipes(mealById.meals);
        const tst = await getMeasuresAndIngredients(mealById.meals);
        setIngredientState(tst);
      }
      if (location.pathname === `/drinks/${id}/in-progress`) {
        // const ingredients = newRecipe.drinks[id];
        // setIngredientState(ingredients[0]);
        const drinkById = await fetchDrinksById(id);
        setRecipes(drinkById.drinks);
      }
      setIsLoading(false);
    };
    getMealOrDrink();
  }, [id, location.pathname]);
  const tst2 = ingredientState[0];
  console.log(tst2);
  return (
    <div>
      { !isLoading ? (
        <div>
          <PhotoAndTitle recipe={ recipes } />
          <button
            className=""
            data-testid="share-btn"
            onClick={ () => clipboardShare(window.location.href) }
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
          <Ingredients recipe={ recipes } />
          {/* { ingredients &&
            ingredients.map((ingredient, index) => (
              <div key={ index }>
                <label
                  htmlFor={ `ingredient${index}` }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    className="checked"
                    type="checkbox"
                    id={ `ingredient${index}` }
                  />
                  <span className="text">{`${measures[index]} ${ingredient}` }</span>
                </label>
              </div>
            ))
          } */}
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
