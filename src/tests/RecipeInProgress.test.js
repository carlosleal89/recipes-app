import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import oneMeal from '../mocks/oneMeal';
import oneDrink from '../mocks/oneDrink';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const LINK_COPIED = 'Link copied!';

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
    renderWithRouter(<App />, { initialEntries: ['/meals/52771/in-progress'] });

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
    renderWithRouter(<App />, { initialEntries: ['/drinks/178319/in-progress'] });

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
});
