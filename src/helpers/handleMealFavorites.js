const handleMealFavorites = (mealFav, isFavorite, setIsFavorite, recipe) => {
  if (!isFavorite) {
    setIsFavorite(true);
    const newFavoriteMeal = {
      id: mealFav.idMeal,
      type: 'meal',
      nationality: mealFav.strArea,
      category: mealFav.strCategory,
      alcoholicOrNot: '',
      name: mealFav.strMeal,
      image: mealFav.strMealThumb,
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
      .filter((recipeItem) => recipeItem.id !== recipe[0].idMeal);
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(favoriteArrayRemoved));
  }
};

export default handleMealFavorites;
