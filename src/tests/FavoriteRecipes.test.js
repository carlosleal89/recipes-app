import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

const products = [{
  alcoholicOrNot: 'Alcoholic',
  category: 'Cocktail',
  id: '17222',
  image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  name: 'A1',
  nationality: '',
  type: 'drink',
},
{
  alcoholicOrNot: '',
  category: 'Side',
  id: '53060',
  image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  name: 'Burek',
  nationality: 'Croatian',
  type: 'meal',
}];

const pageName = '/favorite-recipes';

describe('Testa a funcionalidade da página FavoriteRecipes', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  it('Nao deve renderizar nada', () => {
    renderWithRouter(<App />, { initialEntries: [pageName] });
    const holder = screen.getByTestId('products-holder');

    expect(holder.childElementCount).toBe(0);
  });
  it('Testa se renderiza o componente da forma certa', () => {
    setLocalStorage('favoriteRecipes', products);
    renderWithRouter(<App />, { initialEntries: [pageName] });

    const holder = screen.getByTestId('products-holder');

    expect(holder.childElementCount).toBe(2);
  });
  it('Testa se renderiza o meal corretamente', () => {
    setLocalStorage('favoriteRecipes', [products[1]]);
    renderWithRouter(<App />, { initialEntries: [pageName] });

    const imgCard = screen.getByTestId('0-horizontal-image');
    const categoryCard = screen.getByTestId('0-horizontal-top-text');
    const nameCard = screen.getByTestId('0-horizontal-name');
    const shareCard = screen.getByTestId('0-horizontal-share-btn');
    const favoriteCard = screen.getByTestId('0-horizontal-favorite-btn');
    const categoryCardText = screen
      .getByText(`${products[1].nationality} - ${products[1].category}`);

    expect(imgCard).toBeInTheDocument();
    expect(categoryCard).toBeInTheDocument();
    expect(categoryCardText).toBeInTheDocument();
    expect(nameCard).toBeInTheDocument();
    expect(shareCard).toBeInTheDocument();
    expect(favoriteCard).toBeInTheDocument();
  });
  it('Testa se renderiza o drink corretamente', () => {
    setLocalStorage('favoriteRecipes', [products[0]]);
    renderWithRouter(<App />, { initialEntries: [pageName] });

    const imgCard = screen.getByTestId('0-horizontal-image');
    const categoryCard = screen.getByTestId('0-horizontal-top-text');
    const nameCard = screen.getByTestId('0-horizontal-name');
    const shareCard = screen.getByTestId('0-horizontal-share-btn');
    const favoriteCard = screen.getByTestId('0-horizontal-favorite-btn');
    const categoryCardText = screen
      .getByText(`${products[0].alcoholicOrNot} - ${products[0].category}`);

    expect(imgCard).toBeInTheDocument();
    expect(categoryCard).toBeInTheDocument();
    expect(categoryCardText).toBeInTheDocument();
    expect(nameCard).toBeInTheDocument();
    expect(shareCard).toBeInTheDocument();
    expect(favoriteCard).toBeInTheDocument();
  });
});
