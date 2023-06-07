import React from 'react';
// import React, { useEffect, useParams, useState } from 'react';
import oneMeal from '../mocks/oneMeal';
import oneDrink from '../mocks/oneDrink';
import MealDetail from '../components/recipesDetails/MealDetail';
import DrinkDetail from '../components/recipesDetails/DrinkDetail';
import '../css/RecipesDetails.css';

function RecipeDetails() {
  // const [isMeal, setIsMeal] = useState(false);
  // const { id } = useParams();

  // console.log(id);

  // useEffect(() => {
  //   // request API, passando o id
  //   // Meal: https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita}
  //   // Drink: https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id-da-receita}
  // }, []);

  // console.log(oneMeal);
  // teste

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
    <div className="container__recipes-details">
      <MealDetail
        meal={ oneMeal.meals }
        getIngredients={ getMeasuresAndIngredients }
      />
      <DrinkDetail
        drink={ oneDrink.drinks }
        getIngredients={ getMeasuresAndIngredients }
      />
    </div>
  );
}

export default RecipeDetails;
