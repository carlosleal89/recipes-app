import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import products from '../mocks/products';

jest.mock('clipboard-copy', () => jest.fn());

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

const getLocalStorage = (id) => JSON.parse(window.localStorage.getItem(id));

const pageName = '/favorite-recipes';
const holderTestId = 'products-holder';
const shareTestId = '0-horizontal-share-btn';
const favoriteTestId = '0-horizontal-favorite-btn';
const imgTestId = '0-horizontal-image';
const nameTestId = '0-horizontal-name';

describe('Testa a funcionalidade da página FavoriteRecipes', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  describe('Testa se renderiza corretamente', () => {
    it('Nao deve renderizar nada', () => {
      renderWithRouter(<App />, { initialEntries: [pageName] });

      const holder = screen.getByTestId(holderTestId);

      expect(holder.childElementCount).toBe(0);
    });
    it('Testa se renderiza o componente da forma certa', () => {
      setLocalStorage('favoriteRecipes', products);
      renderWithRouter(<App />, { initialEntries: [pageName] });

      const holder = screen.getByTestId(holderTestId);

      expect(holder.childElementCount).toBe(4);
    });
    it('Testa se renderiza o meal corretamente', () => {
      setLocalStorage('favoriteRecipes', [products[1]]);
      renderWithRouter(<App />, { initialEntries: [pageName] });

      const imgCard = screen.getByTestId(imgTestId);
      const categoryCard = screen.getByTestId('0-horizontal-top-text');
      const nameCard = screen.getByTestId(nameTestId);
      const shareCard = screen.getByTestId(shareTestId);
      const favoriteCard = screen.getByTestId(favoriteTestId);
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

      const imgCard = screen.getByTestId(imgTestId);
      const categoryCard = screen.getByTestId('0-horizontal-top-text');
      const nameCard = screen.getByTestId(nameTestId);
      const shareCard = screen.getByTestId(shareTestId);
      const favoriteCard = screen.getByTestId(favoriteTestId);
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
  describe('Testa o filtro', () => {
    it('Testa o filtro de meal', () => {
      setLocalStorage('favoriteRecipes', products);
      renderWithRouter(<App />, { initialEntries: [pageName] });

      const mealFilter = screen.getByRole('button', { name: /meal/i });
      const holder = screen.getByTestId(holderTestId);

      userEvent.click(mealFilter);

      expect(holder.childElementCount).toBe(3);
    });
    it('Testa o filtro de drink', () => {
      setLocalStorage('favoriteRecipes', products);
      renderWithRouter(<App />, { initialEntries: [pageName] });

      const drinkFilter = screen.getByRole('button', { name: /drink/i });
      const holder = screen.getByTestId(holderTestId);

      userEvent.click(drinkFilter);

      expect(holder.childElementCount).toBe(1);
    });
    it('Testa o filtro de all', () => {
      setLocalStorage('favoriteRecipes', products);
      renderWithRouter(<App />, { initialEntries: [pageName] });

      const mealFilter = screen.getByRole('button', { name: /meal/i });

      userEvent.click(mealFilter);

      const allFilter = screen.getByRole('button', { name: /all/i });
      const holder = screen.getByTestId(holderTestId);

      userEvent.click(allFilter);

      expect(holder.childElementCount).toBe(4);
    });
  });
  describe('Testa funcionalidade do favoritos', () => {
    it('Testa se remove do localstorage', () => {
      setLocalStorage('favoriteRecipes', products);
      renderWithRouter(<App />, { initialEntries: [pageName] });

      const favoriteCard = screen.getByTestId(favoriteTestId);

      userEvent.click(favoriteCard);

      const currentLocalStorage = getLocalStorage('favoriteRecipes');

      expect(currentLocalStorage.length).toBe(3);

      const holder = screen.getByTestId(holderTestId);

      expect(holder.childElementCount).toBe(3);
    });
  });
  describe('Testa se é redirecionado para outra rota', () => {
    it('Testa se é redirecionado para a rota de detalhes ao clicar na imagem de drinks', () => {
      setLocalStorage('favoriteRecipes', [products[0]]);
      const { history } = renderWithRouter(<App />, { initialEntries: [pageName] });

      const imgCard = screen.getByTestId(imgTestId);

      userEvent.click(imgCard);

      expect(history.location.pathname).toBe(`/drinks/${products[0].id}`);
    });
    it('Testa se é redirecionado para a rota de detalhes ao clicar no nome', () => {
      setLocalStorage('favoriteRecipes', [products[0]]);
      const { history } = renderWithRouter(<App />, { initialEntries: [pageName] });

      const nameCard = screen.getByTestId(nameTestId);

      userEvent.click(nameCard);

      expect(history.location.pathname).toBe(`/drinks/${products[0].id}`);
    });
    it('Testa se é redirecionado para a rota de detalhes ao clicar na imagem de meals', () => {
      setLocalStorage('favoriteRecipes', [products[1]]);
      const { history } = renderWithRouter(<App />, { initialEntries: [pageName] });

      const imgCard = screen.getByTestId(imgTestId);

      userEvent.click(imgCard);

      expect(history.location.pathname).toBe(`/meals/${products[1].id}`);
    });
    it('Testa se é redirecionado para a rota de detalhes ao clicar no nome', () => {
      setLocalStorage('favoriteRecipes', [products[1]]);
      const { history } = renderWithRouter(<App />, { initialEntries: [pageName] });

      const nameCard = screen.getByTestId(nameTestId);

      userEvent.click(nameCard);

      expect(history.location.pathname).toBe(`/meals/${products[1].id}`);
    });
  });
  describe('Testa o botão share', () => {
    it('Testa se aparece a mensagem na tela quando clica num drink', () => {
      setLocalStorage('favoriteRecipes', [products[0]]);
      renderWithRouter(<App />, { initialEntries: [pageName] });

      const shareCard = screen.getByTestId(shareTestId);

      userEvent.click(shareCard);

      const message = screen.getByTestId('copy-clipboard');

      expect(message).toBeInTheDocument();
    });
    it('Testa se aparece a mensagem na tela quando clica num meal', () => {
      setLocalStorage('favoriteRecipes', [products[1]]);
      renderWithRouter(<App />, { initialEntries: [pageName] });

      const shareCard = screen.getByTestId(shareTestId);

      userEvent.click(shareCard);

      const message = screen.getByTestId('copy-clipboard');

      expect(message).toBeInTheDocument();
    });
  });
});
