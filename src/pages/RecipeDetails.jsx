import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MealDetail from '../components/recipesDetails/MealDetail';
import DrinkDetail from '../components/recipesDetails/DrinkDetail';
import {
  fetchMealsById,
  fetchDrinksById,
  fetchRecommendationDrinks,
  fetchRecommendationMeals } from '../helpers/API_URL';
import '../css/RecipesDetails.css';
import Loading from '../components/recipesDetails/Loading';
import formatRecipeKeys from '../helpers/formatRecipeKeys';

function RecipeDetails() {
  const [meal, setMeal] = useState(null);
  const [drink, setDrink] = useState(null);
  const [recommendationDrinks, setRecommendationDrinks] = useState(null);
  const [recommendationMeals, setRecommendationMeals] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const getMealOrDrink = async () => {
      if (location.pathname === `/meals/${id}`) {
        const mealById = await fetchMealsById(id);
        const formatedMeal = formatRecipeKeys(mealById.meals);
        setMeal(formatedMeal);
        const recommendation = await fetchRecommendationDrinks();
        setRecommendationDrinks(recommendation);
      }

      if (location.pathname === `/drinks/${id}`) {
        const drinkById = await fetchDrinksById(id);
        const formatedDrink = formatRecipeKeys(drinkById.drinks);
        setDrink(formatedDrink);
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
