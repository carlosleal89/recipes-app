import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        type="text"
        // value={ }
        data-testid="search-input"
        placeholder="Pesquisar"
        // onChange={ () => {} }
      />
      <label htmlFor="radio">
        <input
          type="radio"
          name="ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          name="name"
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="first">
        <input
          type="radio"
          name="first"
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button
        name="search-btn"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
