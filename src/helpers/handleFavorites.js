const handleFavorites = (mealFav, isFavorite, setIsFavorite) => {
  if (!isFavorite) {
    setIsFavorite(true);
    const newFavoriteMeal = {
      id: mealFav.id,
      type: mealFav.type || (mealFav.idMeal && 'meal') || (mealFav.idDrink && 'drink'),
      nationality: mealFav.nationality,
      category: mealFav.category,
      alcoholicOrNot: mealFav.alcoholicOrNot || '',
      name: mealFav.name,
      image: mealFav.image,
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
    setIsFavorite(false);
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
    const favoriteArrayRemoved = newFavoriteRecipesArray
      .filter((recipeItem) => recipeItem.id !== mealFav.id);
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(favoriteArrayRemoved));
  }
};

const checkFavorites = (recipe, setFavorite) => {
  if (localStorage.favoriteRecipes) {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
    const isFavoriteRecipe = newFavoriteRecipesArray
      .some((favoriteItem) => {
        if (recipe.idMeal) {
          return favoriteItem.id === recipe.idMeal || favoriteItem.id === recipe.id;
        } return favoriteItem.id === recipe.idDrink || favoriteItem.id === recipe.id;
      });
    setFavorite(isFavoriteRecipe);
  }
};

export { handleFavorites, checkFavorites };
