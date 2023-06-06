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
    </div>
  );
}

export default SearchBar;
