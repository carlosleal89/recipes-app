import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchMeals,
  fetchMealsName,
  fetchMealsFirstLetter,
  fetchDrinks,
  fetchDrinksName,
  fetchDrinksFirstLetter,
} from '../services/mealApi';
import MealsContext from '../context/MealsContext';
import DrinkContext from '../context/DrinksContext';

function SearchBar() {
  const [activeRadio, setActieRadio] = useState('');
  const [search, setSearch] = useState('');
  const { setMealListArray } = useContext(MealsContext);
  const { setDrinkListArray } = useContext(DrinkContext);
  const history = useHistory();
  const page = history.location.pathname;

  const handleError = () => {
    global.alert(
      'Sorry, we haven\'t found any recipes for these filters.',
    );
  };

  const handleIngridientSearch = async (id, MAX_LENGTH) => {
    const url = page === '/meals'
      ? await fetchMeals(id) : await fetchDrinks(id);
    const urlTeste = page === '/meals'
      ? setMealListArray(url.meals.slice(0, MAX_LENGTH))
      : setDrinkListArray(url.drinks.slice(0, MAX_LENGTH));
    console.log(urlTeste);
  };

  const handleNameSearch = async (id, MAX_LENGTH) => {
    const urlMeal = page === '/meals';
    if (urlMeal) {
      const meal = await fetchMealsName(id);
      if (!meal.meals) {
        return handleError();
      }
      const mealTeste = meal.meals.length > 1
        ? setMealListArray(meal.meals.slice(0, MAX_LENGTH))
        : history.push(`/meals/${meal.meals[0].idMeal}`);
      console.log(mealTeste);
    }
    const urlDrink = page === '/drinks';
    if (urlDrink) {
      const drink = await fetchDrinksName(id);
      if (!drink.drinks) {
        return handleError();
      }
      const drinkTeste = drink.drinks.length > 1
        ? setDrinkListArray(drink.drinks.slice(0, MAX_LENGTH))
        : history.push(`/drinks/${drink.drinks[0].idDrink}`);
      console.log(drinkTeste);
    }
  };

  const handleFirstLetter = async (id, MAX_LENGTH) => {
    const url = page === '/meals'
      ? await fetchMealsFirstLetter(id) : await fetchDrinksFirstLetter(id);
    const urlTeste = page === '/meals'
      ? setMealListArray(url.meals.slice(0, MAX_LENGTH))
      : setDrinkListArray(url.drinks.slice(0, MAX_LENGTH));
    console.log(urlTeste);
  };

  const handleSearchBtn = async (id) => {
    const MAX_LENGTH = 12;
    switch (activeRadio) {
    case 'Ingredient':
      handleIngridientSearch(id, MAX_LENGTH);
      break;
    case 'Name':
      handleNameSearch(id, MAX_LENGTH);
      break;
    case 'FirstLetter':
      if (search.length !== 1) {
        global.alert(
          'Your search must have only 1 (one) character',
        );
      }
      handleFirstLetter(id, MAX_LENGTH);
      break;
    default:
      return global.alert(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ search }
        placeholder="Pesquisar"
        onChange={ (event) => setSearch(event.target.value) }
      />
      <label htmlFor="radio">
        <input
          type="radio"
          name="ingredient"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onClick={ () => setActieRadio('Ingredient') }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          name="name"
          value="name"
          data-testid="name-search-radio"
          onClick={ () => setActieRadio('Name') }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          name="first"
          value="first-letter"
          data-testid="first-letter-search-radio"
          onClick={ () => setActieRadio('FirstLetter') }
        />
        First letter
      </label>
      <button
        style={ {
          backgroundColor: '#d3d3d3',
          borderRadius: 50,
        } }
        name="search-btn"
        data-testid="exec-search-btn"
        onClick={ () => handleSearchBtn(search) }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
