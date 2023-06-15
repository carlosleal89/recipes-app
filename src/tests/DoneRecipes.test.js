import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const LINK_COPIED = 'Link copied!';
const DONE_RECIPES = '/done-recipes';

describe('Testes da página de receitas concluídas', () => {
  beforeEach(() => {
    const doneRecipesData = [{
      id: '53060',
      type: 'meal',
      nationality: 'Croatian',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Burek',
      image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
      doneDate: '2023-06-15T21:47:03.846Z',
      tags: ['Streetfood', 'Onthego'],
    }];
    const setDoneRecipes = JSON.stringify(doneRecipesData);
    localStorage.setItem('doneRecipes', setDoneRecipes);
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(getDoneRecipes);

    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se ao clicar no botão compartilhar o link é copiado e aparece a mensagem', () => {
    renderWithRouter(<App />, { initialEntries: [DONE_RECIPES] });

    const buttonShare = screen.getByRole('img', { name: /share icon/i });
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
});
