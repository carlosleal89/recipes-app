import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import TitleContext from '../context/TitleContext';
import CardFinishedRecipes from '../components/CardFinishedRecipes';

function DoneRecipes() {
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle('Done Recipes');
  }, [setTitle]);

  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        // onClick={  }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        // onClick={  }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        // onClick={  }
      >
        Drink
      </button>
      <CardFinishedRecipes />
    </div>
  );
}

export default DoneRecipes;
