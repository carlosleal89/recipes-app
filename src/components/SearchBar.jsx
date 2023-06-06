import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchMeals,
  fetchMealsName,
  fetchMealsFirstLetter,
  fetchDrinks,
  fetchDrinksName,
  fetchDrinksFirstLetter,
} from '../services/mealApi';

function SearchBar() {
  const [activeRadio, setActieRadio] = useState('');
  const [search, setSearch] = useState('');
  const history = useHistory();
  const page = history.location.pathname;

  const handleSearchBtn = async (id) => {
    switch (activeRadio) {
    case 'Ingredient':
      {
        const url = page === '/meals'
          ? await fetchMeals(id) : await fetchDrinks(id);
        console.log(url);
      }
      break;
    case 'Name':
      {
        const urlMeal = page === '/meals';
        if (urlMeal) {
          const meal = await fetchMealsName(id);
          console.log(meal);
          history.push(`/meals/${meal.meals[0].idMeal}`);
        }
        const urlDrink = page === '/drinks';
        if (urlDrink) {
          const drink = await fetchDrinksName(id);
          console.log(drink);
          history.push(`/drinks/${drink.drinks[0].idDrink}`);
        }
      }
      break;
    case 'FirstLetter':
      if (search.length !== 1) {
        global.alert(
          'Your search must have only 1 (one) character',
        );
      }
      {
        const url = page === '/meals'
          ? await fetchMealsFirstLetter(id) : await fetchDrinksFirstLetter(id);
        console.log(url);
      }
      break;
    default:
      return true;
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
