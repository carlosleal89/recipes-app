import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import TitleContext from '../context/TitleContext';
import CardFinishedRecipes from '../components/CardFinishedRecipes';
import FilterButtons from '../components/FilterButtons';
import '../css/DoneRecipes.css';

function DoneRecipes() {
  const { setTitle } = useContext(TitleContext);
  const [doneRecipes, setDoneRecipes] = useState(() => {
    const localStorageData = localStorage.getItem('doneRecipes');
    return localStorage ? JSON.parse(localStorageData) : [];
  });

  useEffect(() => {
    setTitle('Done Recipes');
  }, [setTitle]);

  return (
    <div className="container__main-done-recipes">
      <Header />
      <FilterButtons
        setStateFunction={ setDoneRecipes }
        localStorageKey="doneRecipes"
      />
      {doneRecipes
      && doneRecipes.map((recipe, index) => (
        <CardFinishedRecipes
          key={ `${index}${Math.floor(Math.random() * 100)}` }
          recipe={ recipe }
          index={ index }
        />
      ))}
    </div>
  );
}

export default DoneRecipes;
