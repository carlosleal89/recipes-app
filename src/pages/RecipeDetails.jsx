import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MealDetail from '../components/recipesDetails/MealDetail';
import DrinkDetail from '../components/recipesDetails/DrinkDetail';
import { fetchMealsById,
  fetchDrinksById,
  fetchRecommendationDrinks,
  fetchRecommendationMeals } from '../helpers/API_URL';
import '../css/RecipesDetails.css';

function RecipeDetails() {
  const [meal, setMeal] = useState(null);
  const [drink, setDrink] = useState(null);

  const [recommendationDrinks, setRecommendationDrinks] = useState(null);
  const [recommendationMeals, setRecommendationMeals] = useState(null);

  const { id } = useParams();
  const location = useLocation();

  console.log(id);

  useEffect(() => {
    const getMealOrDrink = async () => {
      if (location.pathname === `/meals/${id}`) {
        const mealById = await fetchMealsById(id);
        setMeal(mealById);
        const recommendation = await fetchRecommendationDrinks();
        setRecommendationDrinks(recommendation);
      }

      if (location.pathname === `/drinks/${id}`) {
        const drinkById = await fetchDrinksById(id);
        setDrink(drinkById);
        const recommendation = await fetchRecommendationMeals();
        setRecommendationMeals(recommendation);
      }
    };
    getMealOrDrink();
  }, [id, location.pathname]);

  const getMeasuresAndIngredients = (drinkOrMeal) => {
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

  return (
    <div className="container__recipe-details">
      {meal && (
        <MealDetail
          meal={ meal.meals }
          getIngredients={ getMeasuresAndIngredients }
          recommendation={ recommendationDrinks }
        />
      )}

      {drink && (
        <DrinkDetail
          drink={ drink.drinks }
          getIngredients={ getMeasuresAndIngredients }
          recommendation={ recommendationMeals }
        />
      )}
    </div>
  );
}

export default RecipeDetails;
