const formatRecipeKeys = (recipeArray, recipeType) => recipeArray.map((recipeEl) => ({
  id: recipeEl.idMeal || recipeEl.idDrink,
  type: recipeType,
  nationality: recipeEl.strArea || '',
  category: recipeEl.strCategory,
  alcoholicOrNot: recipeEl.strAlcoholic || '',
  name: recipeEl.strMeal || recipeEl.strDrink,
  image: recipeEl.strMealThumb || recipeEl.strDrinkThumb,
  ...recipeEl,
}));

export default formatRecipeKeys;
