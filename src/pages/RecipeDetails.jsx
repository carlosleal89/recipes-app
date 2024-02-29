import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import DrinkContext from '../context/DrinksContext';
import MealDetail from '../components/recipesDetails/MealDetail';
import DrinkDetail from '../components/recipesDetails/DrinkDetail';
import {
  fetchRecommendationDrinks,
  fetchRecommendationMeals } from '../helpers/API_URL';
import '../css/RecipesDetails.css';
import Loading from '../components/recipesDetails/Loading';
import getRecipeById from '../helpers/getRecipeById';

function RecipeDetails() {
  const [meal, setMeal] = useState(null);
  const [drink, setDrink] = useState(null);
  const [recommendationDrinks, setRecommendationDrinks] = useState(null);
  const [recommendationMeals, setRecommendationMeals] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { mealListArray } = useContext(MealsContext);
  const { drinkListArray } = useContext(DrinkContext);

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const getMealOrDrink = async () => {
      if (location.pathname === `/meals/${id}`) {
        const mealById = getRecipeById(mealListArray, id);
        setMeal(mealById);
        const recommendation = await fetchRecommendationDrinks();
        setRecommendationDrinks(recommendation);
      }

      if (location.pathname === `/drinks/${id}`) {
        const drinkById = getRecipeById(drinkListArray, id);
        setDrink(drinkById);
        const recommendation = await fetchRecommendationMeals();
        setRecommendationMeals(recommendation);
      }

      setIsLoading(false);
    };
    getMealOrDrink();
  }, [id, location.pathname]);

  return (
    <div className="container__recipe-details">
      {!isLoading ? (
        <>
          {meal && (
            <MealDetail
              meal={ meal }
              recommendation={ recommendationDrinks.drinks }
            />
          )}

          {drink && (
            <DrinkDetail
              drink={ drink }
              recommendation={ recommendationMeals.meals }
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default RecipeDetails;
