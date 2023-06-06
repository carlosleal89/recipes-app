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
      try {
        const url = page === '/meals'
          ? await fetchMeals(id) : await fetchDrinks(id);
        console.log(url);
      } catch (error) {
        console.log(error);
      }
      break;
    case 'Name':
      try {
        const url = page === '/meals'
          ? await fetchMealsName(id) : await fetchDrinksName(id);
        console.log(url);
      } catch (error) {
        console.log(error);
      }
      break;
    case 'FirstLetter':
      try {
        const url = page === '/meals'
          ? await fetchMealsFirstLetter(id) : await fetchDrinksFirstLetter(id);
        console.log(url);
      } catch {
        global.alert('Your search must have only 1 (one) character');
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
          id="ingredient"
          data-testid="ingredient-search-radio"
          onClick={ () => setActieRadio('Ingredient') }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          name="name"
          id="name"
          data-testid="name-search-radio"
          onClick={ () => setActieRadio('Name') }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          name="first"
          id="first-letter"
          data-testid="first-letter-search-radio"
          onClick={ () => setActieRadio('FirstLetter') }
        />
        First letter
      </label>
      <button
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
