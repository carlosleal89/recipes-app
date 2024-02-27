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

const handleDrinkFavorites = (drinkFav, isFavorite, setIsFavorite, recipe) => {
  if (!isFavorite) {
    setIsFavorite(true);
    const newFavoriteDrink = {
      id: drinkFav.idDrink,
      type: 'drink',
      nationality: '',
      category: drinkFav.strCategory,
      alcoholicOrNot: drinkFav.strAlcoholic,
      name: drinkFav.strDrink,
      image: drinkFav.strDrinkThumb,
    };
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = localStorage.getItem('favoriteRecipes');
      const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
      newFavoriteRecipesArray.push(newFavoriteDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesArray));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavoriteDrink]));
    }
  } else {
    setIsFavorite(false);
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
    const favoriteArrayRemoved = newFavoriteRecipesArray
      .filter((recipeItem) => recipeItem.id !== recipe[0].idDrink);
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(favoriteArrayRemoved));
  }
};

const checkFavorites = (location, recipe, setFavorite) => {
  if (localStorage.favoriteRecipes && location.pathname.includes('/meals')) {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
    const isFavoriteMeal = newFavoriteRecipesArray
      .some((recipeItem) => recipeItem.id === recipe[0].idMeal);
    setFavorite(isFavoriteMeal);
  } else if (localStorage.favoriteRecipes && location.pathname.includes('/drinks')) {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const newFavoriteRecipesArray = JSON.parse(favoriteRecipes);
    const isFavoriteDrink = newFavoriteRecipesArray
      .some((recipeItem) => recipeItem.id === recipe[0].idDrink);
    setFavorite(isFavoriteDrink);
  }
};

export { handleMealFavorites, handleDrinkFavorites, checkFavorites };
