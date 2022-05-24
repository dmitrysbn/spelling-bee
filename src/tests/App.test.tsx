import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moxios from 'moxios';
import { createRoot } from 'react-dom/client';
import App from '../App';

const puzzle = 'HOCIGEDNT';
const mainLetter = 'G';
const score = {
  id: '0',
  points: 4,
  words: '["GONG"]',
  complete: false,
  userId: 'dmitry',
  puzzleId: '0c84d2f3-5d71-4b77-be8a-54c932610d48',
  createdAt: '2022-05-20T20:31:52.440Z',
};

describe('<App />', () => {
  beforeEach(() => {
    moxios.install();

    const container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      createRoot(container).render(
        <App puzzle={puzzle} mainLetter={mainLetter} />
      );

      moxios.stubRequest('localhost:1337/puzzles/current_puzzle', {
        status: 200,
        response: { puzzleId: '0c84d2f3-5d71-4b77-be8a-54c932610d48' },
      });
    });
  });

  afterEach(function () {
    moxios.uninstall();
    document.getElementsByTagName('body')[0].innerHTML = '';
  });

  it('renders the App page', () => {
    const title = screen.getByText('Spelling Bee :)');
    expect(title).toBeInTheDocument();

    const wordsFound = screen.getByText('You have found 0 words');
    expect(wordsFound).toBeInTheDocument();
  });

  it('Clicks in a legal word', async () => {
    const g = screen.getByText('G');
    const o = screen.getByText('O');
    const n = screen.getByText('N');
    const h = screen.getByText('H');

    // clicks 'GONGH'
    userEvent.click(g);
    userEvent.click(o);
    userEvent.click(n);
    userEvent.click(g);
    userEvent.click(h);

    // deletes the last letter
    const deleteButton = screen.getByText('Delete');
    userEvent.click(deleteButton);

    // clicks Enter
    const enterButton = screen.getByText('Enter');
    userEvent.click(enterButton);

    await act(async () => {
      moxios.requests.mostRecent().respondWith({
        status: 200,
        response: score,
      });
    });

    const error = screen.queryByText('Already found');
    expect(error).not.toBeInTheDocument();

    const foundWord = screen.getByText('Gong');
    expect(foundWord).toBeInTheDocument();
  });

  it('Submits empty term', () => {
    const form = screen.getByRole('textbox');

    // presses enter
    userEvent.type(form, '{enter}');

    const error = screen.queryByText('Already found');
    expect(error).not.toBeInTheDocument();
  });

  it('Types in a legal word', async () => {
    const form = screen.getByRole('textbox');

    await act(async () => {
      // types in 'GONG' and presses enter
      userEvent.type(form, 'GONG{enter}');

      await moxios.requests.mostRecent().respondWith({
        status: 200,
        response: score,
      });
    });

    const foundWord = screen.getByText('Gong');
    expect(foundWord).toBeInTheDocument();
  });

  describe('Validation errors', () => {
    it('Too short', () => {
      const form = screen.getByRole('textbox');

      // types in 'GON'
      userEvent.type(form, 'GON{enter}');

      const error = screen.queryByText('Too short');
      expect(error).toBeInTheDocument();
    });

    it('Bad letters', () => {
      const form = screen.getByRole('textbox');

      // types in 'LOLZ'
      userEvent.type(form, 'LOLZ{enter}');

      const error = screen.queryByText('Bad letters');
      expect(error).toBeInTheDocument();
    });

    it('Missing center letter', () => {
      const form = screen.getByRole('textbox');

      // types in 'CENT'
      userEvent.type(form, 'CENT{enter}');

      const error = screen.queryByText('Missing center letter');
      expect(error).toBeInTheDocument();
    });

    it('Not in word list', async () => {
      const form = screen.getByRole('textbox');

      await act(async () => {
        // types in 'GONGING'
        userEvent.type(form, 'GONGING{enter}');

        await moxios.requests.mostRecent().respondWith({
          status: 200,
          response: { ...score, points: 0 },
        });
      });

      const error = screen.queryByText('Not in word list');
      expect(error).toBeInTheDocument();
    });

    it('Already found', async () => {
      const form = screen.getByRole('textbox');

      await act(async () => {
        // types in 'GONG' and presses enter
        userEvent.type(form, 'GONG{enter}');

        await moxios.requests.mostRecent().respondWith({
          status: 200,
          response: score,
        });
      });

      // types in 'GONG' again and presses enter
      userEvent.type(form, 'GONG{enter}');

      const error = screen.queryByText('Already found');
      expect(error).toBeInTheDocument();

      await waitForElementToBeRemoved(error, {
        timeout: 2000,
      });
      expect(error).not.toBeInTheDocument();
    });

    describe('Clearing errors', () => {
      it('Typing clears errors', () => {
        const form = screen.getByRole('textbox');

        userEvent.type(form, 'G{enter}');

        const error = screen.queryByText('Too short');
        expect(error).toBeInTheDocument();

        userEvent.type(form, 'G');
        expect(error).not.toBeInTheDocument();

        expect((form as HTMLInputElement).value).toEqual('G');
      });

      it('Clicking letters clears errors', () => {
        const form = screen.getByRole('textbox');

        const g = screen.getByText('G');
        userEvent.click(g);

        userEvent.type(form, '{enter}');

        const error = screen.queryByText('Too short');
        expect(error).toBeInTheDocument();

        userEvent.click(g);
        expect(error).not.toBeInTheDocument();

        expect((form as HTMLInputElement).value).toEqual('G');
      });

      it('Clicking delete clears errors', () => {
        const form = screen.getByRole('textbox');
        userEvent.type(form, 'G{enter}');

        const error = screen.queryByText('Too short');
        expect(error).toBeInTheDocument();

        userEvent.type(form, '{backspace}');
        expect(error).not.toBeInTheDocument();

        expect((form as HTMLInputElement).value).toEqual('');
      });

      it('Pressing delete clears errors', () => {
        const form = screen.getByRole('textbox');
        userEvent.type(form, 'G{enter}');

        const error = screen.queryByText('Too short');
        expect(error).toBeInTheDocument();

        userEvent.click(screen.getByRole('button', { name: 'Delete' }));
        expect(error).not.toBeInTheDocument();

        expect((form as HTMLInputElement).value).toEqual('');
      });
    });
  });

  describe('Delete', () => {
    it('Clicking delete button removes last character', () => {
      const form = screen.getByRole('textbox');

      userEvent.type(form, 'G');

      expect((form as HTMLInputElement).value).toEqual('G');

      userEvent.click(screen.getByRole('button', { name: 'Delete' }));

      expect((form as HTMLInputElement).value).toEqual('');
    });

    it('Pressing delete key removes last character', () => {
      const form = screen.getByRole('textbox');

      userEvent.type(form, 'G');

      expect((form as HTMLInputElement).value).toEqual('G');

      userEvent.type(form, '{backspace}');

      expect((form as HTMLInputElement).value).toEqual('');
    });
  });

  describe('Refresh', () => {
    it('Clicking refresh button randomizes letters', () => {
      const initialButtons = screen.getAllByRole('button', { name: /letter/ });

      userEvent.click(screen.getByRole('button', { name: /refresh/ }));

      const finalButtons = screen.getAllByRole('button', { name: /letter/ });

      expect(initialButtons).not.toEqual(finalButtons);
    });

    it('Pressing spacebar randomizes letters', () => {
      const initialButtons = screen.getAllByRole('button', { name: /letter/ });

      const form = screen.getByRole('textbox');
      userEvent.type(form, '{space}');

      const finalButtons = screen.getAllByRole('button', { name: /letter/ });

      expect(initialButtons).not.toEqual(finalButtons);
    });
  });
});
