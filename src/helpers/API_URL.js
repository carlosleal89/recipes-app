const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchMeals = async (ingrediente) => fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);

// export const fetchMealsByCategory = async (category) => fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

export const fetchMealsById = async (id) => fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

export const fetchDrinks = async (ingrediente) => fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);

// export const fetchDrinksByCategory = async (category) => fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

export const fetchDrinksById = async (id) => fetchData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

// export const fetchRecipe = async (url) => fetchData(url);

export const fetchRecommendationDrinks = async () => fetchData('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

export const fetchRecommendationMeals = async () => fetchData('https://www.themealdb.com/api/json/v1/1/search.php?s=');

export const fetchMealsName = async (name) => fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);

export const fetchMealsFirstLetter = async (firstLetter) => fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);

export const fetchDrinksName = async (name) => fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

export const fetchDrinksFirstLetter = async (firstLetter) => fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
