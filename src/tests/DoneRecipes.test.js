import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const LINK_COPIED = 'Link copied!';
const DONE_RECIPES = '/done-recipes';

describe('Testes da página de receitas concluídas', () => {
  beforeEach(() => {
    const doneRecipesData = [
      {
        id: '53060',
        type: 'meal',
        nationality: 'Croatian',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Burek',
        image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
        doneDate: '2023-06-15T21:47:03.846Z',
        tags: ['Streetfood', 'Onthego'],
      },
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '2023-06-16T11:19:55.480Z',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '2023-06-16T11:47:07.445Z',
        tags: [],
      },
    ];
    const setDoneRecipes = JSON.stringify(doneRecipesData);
    localStorage.setItem('doneRecipes', setDoneRecipes);
    JSON.parse(localStorage.getItem('doneRecipes'));

    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se ao clicar no botão compartilhar o link é copiado e aparece a mensagem', () => {
    renderWithRouter(<App />, { initialEntries: [DONE_RECIPES] });

    const buttonShare = screen.getByTestId('0-horizontal-share-btn');
    expect(buttonShare).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonShare);
    });

    const clipBoardMs = screen.getByText(LINK_COPIED);
    expect(clipBoardMs).toBeInTheDocument();

    waitFor(() => {
      expect(screen.queryByText(LINK_COPIED)).not.toBeInTheDocument();
    }, { timeout: 1500 });
  });

  it('Testa o botão de filtro Meals', () => {
    renderWithRouter(<App />, { initialEntries: [DONE_RECIPES] });

    const buttonMeals = screen.getByRole('button', { name: /meals/i });
    expect(buttonMeals).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonMeals);
    });

    expect(screen.getByText(/croatian - side/i)).toBeInTheDocument();
    expect(screen.getByText(/italian - vegetarian/i)).toBeInTheDocument();
    expect(screen.queryByText(/aquamarine/i)).not.toBeInTheDocument();
  });

  it('Testa o botão de filtro Drinks', () => {
    renderWithRouter(<App />, { initialEntries: [DONE_RECIPES] });

    const buttonDrinks = screen.getByRole('button', { name: /drinks/i });
    expect(buttonDrinks).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonDrinks);
    });

    expect(screen.queryByText(/croatian - side/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/italian - vegetarian/i)).not.toBeInTheDocument();
    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
  });

  it('Testa o botão de filtro All', () => {
    renderWithRouter(<App />, { initialEntries: [DONE_RECIPES] });

    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonAll);
    });

    expect(screen.getByText(/croatian - side/i)).toBeInTheDocument();
    expect(screen.getByText(/italian - vegetarian/i)).toBeInTheDocument();
    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
  });
});
