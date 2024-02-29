<div key={ index } className="container__recipe">
    <div
    className="favorite-recipe"
    role="button"
    onClick={ () => handleNavigate(element.type, element.id) }
    onKeyDown={ (event) => {
      if (event.key === 'Enter') {
        handleNavigate(element.type, element.id);
      }
    } }
    tabIndex={ 0 } // Permitir foco em elementos não focaveis
  >
    <img
      role="presentation"
      data-testid={ `${index}-horizontal-image` }
      src={ element.image }
      alt={ element.name }
      key={ index }
      className="favorite-recipe-img"
    />
    <h3
      role="presentation"
      data-testid={ `${index}-horizontal-name` }
      className="favorite-recipe-name"
    >
      {element.name}
    </h3>
    <h5
      data-testid={ `${index}-horizontal-top-text` }
      className="favorite-recipe-category"
    >
      {element.type === 'meal' ? (
        <>
          <span>{element.nationality}</span>
          <br />
          <span>{element.category}</span>
        </>
      ) : (
        <>
          <span>{element.alcoholicOrNot}</span>
          <br />
          <span>{element.category}</span>
        </>
      )}
    </h5>
  </div>
  <div className="container__favorite-buttons bottom-aligned">
    <button
      onClick={ () => clipboardShare(element.type, element.id) }
      className="recipe-share-btn"
    >
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src={ yellowShare }
        alt="share icon"
      />
    </button>
    <button
      onClick={ () => handleClickFavorite(element.id) }
      className="recipe-favorite-btn"
    >
      <img
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ loginRedHeart }
        alt="black heart"
      />
    </button>
  </div>
  {
    clipBoardmsg && (
      <p
        data-testid="copy-clipboard"
        className="favorite-clipboard-msg"
      >
        Link copied!
      </p>)
  }
</div> */}