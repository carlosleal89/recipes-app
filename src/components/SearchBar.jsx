import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchMeals,
  fetchMealsName,
  fetchMealsFirstLetter,
  fetchDrinks,
  fetchDrinksName,
  fetchDrinksFirstLetter,
} from '../helpers/API_URL';
import MealsContext from '../context/MealsContext';
import DrinkContext from '../context/DrinksContext';

function SearchBar() {
  const [activeRadio, setActiveRadio] = useState({ filter: '' });
  const [search, setSearch] = useState('');
  const { setMealListArray } = useContext(MealsContext);
  const { setDrinkListArray } = useContext(DrinkContext);
  const history = useHistory();
  const page = history.location.pathname;

  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon: 'error',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const handleOnChangeFilter = ({ target: { value, name } }) => {
    setActiveRadio({ [name]: value });
  };

  const handleError = () => {
    Toast.fire('Sorry, we haven\'t found any recipes for these filters.');
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
      ? await fetchMealsFirstLetter(id)
      : await fetchDrinksFirstLetter(id);

    const urlTeste = page === '/meals'
      ? setMealListArray(url.meals.slice(0, MAX_LENGTH))
      : setDrinkListArray(url.drinks.slice(0, MAX_LENGTH));
    console.log(urlTeste);
  };

  const handleSearchBtn = async (id) => {
    const MAX_LENGTH = 12;

    switch (activeRadio.filter) {
    case 'ingredient':
      if (search.length < 2) {
        Toast.fire('Please, enter a valid ingredient');
        break;
      }
      handleIngridientSearch(id, MAX_LENGTH);
      break;
    case 'name':
      if (search.length < 1) {
        Toast.fire('Your search is empty');
        break;
      }
      handleNameSearch(id, MAX_LENGTH);
      break;
    case 'first-letter':
      if (search.length !== 1) {
        Toast.fire('Your search must have only 1 (one) character');
        break;
      }
      handleFirstLetter(id, MAX_LENGTH);
      break;
    default:
      return Toast.fire('Sorry, we haven\'t found any recipes for these filters.');
    }
    setSearch('');
  };

  return (
    <div className="container__header-search-2">
      <input
        className="input-search"
        type="text"
        data-testid="search-input"
        value={ search }
        placeholder="Search"
        onChange={ (event) => setSearch(event.target.value) }
      />

      <div className="container__background">
        <div className="container__input-radio">
          <input
            id="ingredient"
            type="radio"
            name="filter"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onClick={ handleOnChangeFilter }
          />
          <label htmlFor="ingredient">Ingredient</label>

          <input
            id="name"
            type="radio"
            name="filter"
            value="name"
            data-testid="name-search-radio"
            onClick={ handleOnChangeFilter }
          />
          <label htmlFor="name">Name</label>

          <input
            id="first-letter"
            type="radio"
            name="filter"
            value="first-letter"
            data-testid="first-letter-search-radio"
            onClick={ handleOnChangeFilter }
          />
          <label htmlFor="first-letter">First letter</label>
        </div>

        <div className="container__search-button">
          <button
            className="search-btn"
            name="search-btn"
            data-testid="exec-search-btn"
            onClick={ () => handleSearchBtn(search) }
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
