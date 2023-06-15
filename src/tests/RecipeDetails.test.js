import { screen, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mealById from '../mocks/mealsById';
import drinkById from '../mocks/drinkById';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const MEALS = '/meals/52977';
const DRINKS = '/drinks/15997';
const WHITE_HEART_ICON = 'whiteHeartIcon.svg';
const BLACK_HEART_ICON = 'blackHeartIcon.svg';
const LINK_COPIED = 'Link copied!';

describe('Teste da página de detalhes da receita começando na rota /meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealById),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });

    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se renderiza os detalhes da receita corretamente', async () => {
    renderWithRouter(<App />, { initialEntries: [MEALS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const img = screen.getByRole('img', { name: /corba/i });
    expect(img).toBeInTheDocument();

    const title = screen.getByRole('heading', { name: /corba/i });
    expect(title).toBeInTheDocument();

    const ingredients = screen.getByRole('heading', { name: /ingredients/i });
    expect(ingredients).toBeInTheDocument();

    const instructions = screen.getByRole('heading', { name: /instructions/i });
    expect(instructions).toBeInTheDocument();

    const recommended = screen.getByRole('heading', { name: /recommended/i });
    expect(recommended).toBeInTheDocument();

    const imgRecommended = screen.getByRole('img', { name: /gg/i });
    expect(imgRecommended).toBeInTheDocument();
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

    act(() => {
      fireEvent.click(buttonFavorite);
    });

    expect(buttonFavorite).toHaveAttribute('src', BLACK_HEART_ICON);
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
    }, { timeout: 1500 });
  });

  it('Testa o botão Start Recipe', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [MEALS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const buttonStart = screen.getByRole('button', { name: /start recipe/i });
    expect(buttonStart).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonStart);
    });

    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
});

describe('Teste da página de detalhes da receita começando na rota /drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkById),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      });

    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se renderiza os detalhes da receita corretamente', async () => {
    renderWithRouter(<App />, { initialEntries: [DRINKS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const img = screen.getByRole('img', { name: /gg/i });
    expect(img).toBeInTheDocument();

    const title = screen.getByRole('heading', { name: /gg/i });
    expect(title).toBeInTheDocument();

    const ingredients = screen.getByRole('heading', { name: /ingredients/i });
    expect(ingredients).toBeInTheDocument();

    const instructions = screen.getByRole('heading', { name: /instructions/i });
    expect(instructions).toBeInTheDocument();

    const recommended = screen.getByRole('heading', { name: /recommended/i });
    expect(recommended).toBeInTheDocument();

    const imgRecommended = screen.getByRole('img', { name: /corba/i });
    expect(imgRecommended).toBeInTheDocument();
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

    act(() => {
      fireEvent.click(buttonFavorite);
    });

    expect(buttonFavorite).toHaveAttribute('src', BLACK_HEART_ICON);
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
    }, { timeout: 1500 });
  });

  it('Testa o botão Start Recipe', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [DRINKS] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const buttonStart = screen.getByRole('button', { name: /start recipe/i });
    expect(buttonStart).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonStart);
    });

    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
});
