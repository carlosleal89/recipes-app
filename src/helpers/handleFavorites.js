const handleMealFavorites = (mealFav, isFavorite, setIsFavorite) => {
  if (!isFavorite) {
    setIsFavorite(true);
    const newFavoriteMeal = {
      id: mealFav.idMeal || mealFav.id,
      type: 'meal',
      nationality: mealFav.strArea || mealFav.nationality,
      category: mealFav.strCategory || mealFav.category,
      alcoholicOrNot: '',
      name: mealFav.strMeal || mealFav.name,
      image: mealFav.strMealThumb || mealFav.image,
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
      .filter((recipeItem) => recipeItem.id !== mealFav.idMeal || mealFav.id);
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(favoriteArrayRemoved));
  }
};

const handleDrinkFavorites = (drinkFav, isFavorite, setIsFavorite) => {
  if (!isFavorite) {
    setIsFavorite(true);
    const newFavoriteDrink = {
      id: drinkFav.idDrink || drinkFav.id,
      type: 'drink',
      nationality: '',
      category: drinkFav.strCategory || drinkFav.category,
      alcoholicOrNot: drinkFav.strAlcoholic || drinkFav.alcoholicOrNot,
      name: drinkFav.strDrink || drinkFav.name,
      image: drinkFav.strDrinkThumb || drinkFav.image,
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
      .filter((recipeItem) => recipeItem.id !== drinkFav.idDrink);
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

export { handleMealFavorites, handleDrinkFavorites, checkFavorites };
