import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import oneMeal from '../mocks/oneMeal';
import oneDrink from '../mocks/oneDrink';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const LINK_COPIED = 'Link copied!';
const WHITE_HEART_ICON = 'whiteHeartIcon.svg';
const BLACK_HEART_ICON = 'blackHeartIcon.svg';
const MEALS = '/meals/52771/in-progress';
const DRINKS = '/drinks/178319/in-progress';
const CHECKBOX_INGREDIENT_0 = '0-ingredient-checkbox';
const CHECKBOX_INGREDIENT_1 = '1-ingredient-checkbox';
const CHECKBOX_INGREDIENT_2 = '2-ingredient-checkbox';

describe('Teste da tela de receita em progresso na rota /meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneMeal),
      });

    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se ao clicar no botão compartilhar o link é copiado e aparece a mensagem', async () => {
    renderWithRouter(<App />, { initialEntries: [MEALS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const buttonShare = screen.getByRole('img', { name: /share icon/i });
    expect(buttonShare).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonShare);
    });

    const clipBoardMs = screen.getByText(LINK_COPIED);
    expect(clipBoardMs).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(LINK_COPIED)).not.toBeInTheDocument();
    }, { timeout: 150000 });
  });

  it('Testa o botão de favoritar', async () => {
    renderWithRouter(<App />, { initialEntries: [MEALS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const buttonFavorite = screen.getByRole('img', { name: /favorite icon/i });
    expect(buttonFavorite).toBeInTheDocument();
    expect(buttonFavorite).toHaveAttribute('src', WHITE_HEART_ICON);

    act(() => {
      fireEvent.click(buttonFavorite);
    });

    expect(buttonFavorite).toHaveAttribute('src', BLACK_HEART_ICON);

    act(() => {
      fireEvent.click(buttonFavorite);
    });

    expect(buttonFavorite).toHaveAttribute('src', WHITE_HEART_ICON);
  });

  it('Testa o LocalStorage favoritesRecipes e se a tela renderiza com a receita ja favoritada', async () => {
    const setFavoriteRecipes = JSON.stringify([{
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      name: 'Spicy Arrabiata Penne',
    }]);
    localStorage.setItem('favoriteRecipes', setFavoriteRecipes);

    renderWithRouter(<App />, { initialEntries: [MEALS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(getFavoriteRecipes[0].id).toBe('52771');

    const buttonFavorite = screen.getByRole('img', { name: /favorite icon/i });
    expect(buttonFavorite).toHaveAttribute('src', BLACK_HEART_ICON);
  });

  it('Testa os checkboxes', async () => {
    renderWithRouter(<App />, { initialEntries: [MEALS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const checkbox = screen.getByTestId(CHECKBOX_INGREDIENT_0);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('Testa o botão Finish recipe', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [MEALS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const buttonFinish = screen.getByRole('button', { name: /finish recipe/i });
    expect(buttonFinish).toBeInTheDocument();
    expect(buttonFinish).not.toBeEnabled();

    const checkbox0 = screen.getByTestId(CHECKBOX_INGREDIENT_0);
    const checkbox1 = screen.getByTestId(CHECKBOX_INGREDIENT_1);
    const checkbox2 = screen.getByTestId(CHECKBOX_INGREDIENT_2);
    const checkbox3 = screen.getByTestId('3-ingredient-checkbox');
    const checkbox4 = screen.getByTestId('4-ingredient-checkbox');
    const checkbox5 = screen.getByTestId('5-ingredient-checkbox');
    const checkbox6 = screen.getByTestId('6-ingredient-checkbox');
    const checkbox7 = screen.getByTestId('7-ingredient-checkbox');

    act(() => {
      fireEvent.click(checkbox0);
      fireEvent.click(checkbox1);
      fireEvent.click(checkbox2);
      fireEvent.click(checkbox3);
      fireEvent.click(checkbox4);
      fireEvent.click(checkbox5);
      fireEvent.click(checkbox6);
      fireEvent.click(checkbox7);
    });

    expect(buttonFinish).toBeEnabled();

    act(() => {
      fireEvent.click(buttonFinish);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });
});

describe('Teste da tela de receita em progresso na rota /drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(oneDrink),
      });

    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se ao clicar no botão compartilhar o link é copiado e aparece a mensagem', async () => {
    renderWithRouter(<App />, { initialEntries: [DRINKS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const buttonShare = screen.getByRole('img', { name: /share icon/i });
    expect(buttonShare).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonShare);
    });

    const clipBoardMs = screen.getByText(LINK_COPIED);
    expect(clipBoardMs).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(LINK_COPIED)).not.toBeInTheDocument();
    }, { timeout: 150000 });
  });

  it('Testa o botão de favoritar', async () => {
    renderWithRouter(<App />, { initialEntries: [DRINKS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const buttonFavorite = screen.getByRole('img', { name: /favorite icon/i });
    expect(buttonFavorite).toBeInTheDocument();
    expect(buttonFavorite).toHaveAttribute('src', WHITE_HEART_ICON);

    act(() => {
      fireEvent.click(buttonFavorite);
    });

    expect(buttonFavorite).toHaveAttribute('src', BLACK_HEART_ICON);

    act(() => {
      fireEvent.click(buttonFavorite);
    });

    expect(buttonFavorite).toHaveAttribute('src', WHITE_HEART_ICON);
  });

  it('Testa o LocalStorage favoritesRecipes e se a tela renderiza com a receita ja favoritada', async () => {
    const setFavoriteRecipes = JSON.stringify([{
      id: '178319',
    }]);
    localStorage.setItem('favoriteRecipes', setFavoriteRecipes);

    renderWithRouter(<App />, { initialEntries: [DRINKS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(getFavoriteRecipes[0].id).toBe('178319');

    const buttonFavorite = screen.getByRole('img', { name: /favorite icon/i });
    expect(buttonFavorite).toHaveAttribute('src', BLACK_HEART_ICON);
  });

  it('Testa os checkboxes', async () => {
    renderWithRouter(<App />, { initialEntries: [DRINKS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const checkbox = screen.getByTestId('0-ingredient-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('Testa o botão Finish recipe', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [DRINKS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const buttonFinish = screen.getByRole('button', { name: /finish recipe/i });
    expect(buttonFinish).toBeInTheDocument();
    expect(buttonFinish).not.toBeEnabled();

    const checkbox0 = screen.getByTestId(CHECKBOX_INGREDIENT_0);
    const checkbox1 = screen.getByTestId(CHECKBOX_INGREDIENT_1);
    const checkbox2 = screen.getByTestId(CHECKBOX_INGREDIENT_2);

    act(() => {
      fireEvent.click(checkbox0);
      fireEvent.click(checkbox1);
      fireEvent.click(checkbox2);
    });

    expect(buttonFinish).toBeEnabled();

    act(() => {
      fireEvent.click(buttonFinish);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });
});
