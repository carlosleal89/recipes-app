import React, { useContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import copy from 'clipboard-copy';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import TitleContext from '../context/TitleContext';
// import loginRedHeart from '../images/loginRedHeart.svg';
// import yellowShare from '../images/yellowShare.svg';
import '../css/FavoriteRecipes.css';
import CardFinishedRecipes from '../components/CardFinishedRecipes';

function FavoriteRecipes() {
  const { setTitle } = useContext(TitleContext);
  // const [clipBoardmsg, setClipBoardMsg] = useState(false);
  const [products, setProducts] = useState(() => {
    const localStorageData = localStorage.getItem('favoriteRecipes');
    return localStorageData ? JSON.parse(localStorageData) : [];
  });
  // const history = useHistory();

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, [setTitle]);

  // const clipboardShare = (type, id) => {
  //   let link;
  //   if (type === 'meal') {
  //     link = `http://localhost:3000/meals/${id}`;
  //   } else {
  //     link = `http://localhost:3000/drinks/${id}`;
  //   }
  //   copy(link);
  //   const SECONDS = 1500;
  //   setClipBoardMsg(true);
  //   setTimeout(() => {
  //     setClipBoardMsg(false);
  //   }, SECONDS);
  // };

  // const handleClickFavorite = (id) => {
  //   const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   const removedId = localStorageData.filter((e) => e.id !== id);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(removedId));
  //   setProducts(removedId);
  // };

  // const handleNavigate = (type, id) => {
  //   if (type === 'meal') {
  //     return history.push(`/meals/${id}`);
  //   }
  //   history.push(`/drinks/${id}`);
  // };

  return (
    <div className="container__main-favorite-recipes">
      <Header />
      <FilterButtons
        setStateFunction={ setProducts }
        localStorageKey="favoriteRecipes"
      />
      <div data-testid="products-holder" className="container__recipe-favorites">
        {
          products.map((element, index) => (
            <CardFinishedRecipes
              key={ `${index}${Math.floor(Math.random() * 100)}` }
              recipe={ element }
              index={ index }
            />
            // <div key={ index } className="container__recipe">
            //   <div
            //     className="favorite-recipe"
            //     role="button"
            //     onClick={ () => handleNavigate(element.type, element.id) }
            //     onKeyDown={ (event) => {
            //       if (event.key === 'Enter') {
            //         handleNavigate(element.type, element.id);
            //       }
            //     } }
            //     tabIndex={ 0 } // Permitir foco em elementos não focaveis
            //   >
            //     <img
            //       role="presentation"
            //       data-testid={ `${index}-horizontal-image` }
            //       src={ element.image }
            //       alt={ element.name }
            //       key={ index }
            //       className="favorite-recipe-img"
            //     />
            //     <h3
            //       role="presentation"
            //       data-testid={ `${index}-horizontal-name` }
            //       className="favorite-recipe-name"
            //     >
            //       {element.name}
            //     </h3>
            //     <h5
            //       data-testid={ `${index}-horizontal-top-text` }
            //       className="favorite-recipe-category"
            //     >
            //       {element.type === 'meal' ? (
            //         <>
            //           <span>{element.nationality}</span>
            //           <br />
            //           <span>{element.category}</span>
            //         </>
            //       ) : (
            //         <>
            //           <span>{element.alcoholicOrNot}</span>
            //           <br />
            //           <span>{element.category}</span>
            //         </>
            //       )}
            //     </h5>
            //   </div>
            //   <div className="container__favorite-buttons bottom-aligned">
            //     <button
            //       onClick={ () => clipboardShare(element.type, element.id) }
            //       className="recipe-share-btn"
            //     >
            //       <img
            //         data-testid={ `${index}-horizontal-share-btn` }
            //         src={ yellowShare }
            //         alt="share icon"
            //       />
            //     </button>
            //     <button
            //       onClick={ () => handleClickFavorite(element.id) }
            //       className="recipe-favorite-btn"
            //     >
            //       <img
            //         data-testid={ `${index}-horizontal-favorite-btn` }
            //         src={ loginRedHeart }
            //         alt="black heart"
            //       />
            //     </button>
            //   </div>
            //   {
            //     clipBoardmsg && (
            //       <p
            //         data-testid="copy-clipboard"
            //         className="favorite-clipboard-msg"
            //       >
            //         Link copied!
            //       </p>)
            //   }
            // </div>
          ))
        }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
