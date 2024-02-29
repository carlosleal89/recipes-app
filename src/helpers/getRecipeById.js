const getRecipeById = (recipeArray, id) => {
  const recipeDetails = recipeArray.filter((recipeEl) => recipeEl.id === id);
  return recipeDetails;
};

export default getRecipeById;
