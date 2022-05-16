import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('<App />', () => {
  beforeEach(() => {
    localStorage.clear();

    render(<App puzzle={puzzle} mainLetter={mainLetter} />);
  });

  const puzzle = 'HOCIGEDNT';
  const mainLetter = 'G';

  it('renders the App page', () => {
    const title = screen.getByText('Spelling Bee :)');
    expect(title).toBeInTheDocument();

    const wordsFound = screen.getByText('You have found 0 words');
    expect(wordsFound).toBeInTheDocument();
  });

  it('Clicks in a legal word', () => {
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

  it('Types in a legal word', () => {
    const form = screen.getByRole('textbox');

    // types in 'GONG' and presses enter
    userEvent.type(form, 'GONG{enter}');

    const foundWord = screen.getByText('Gong');
    expect(foundWord).toBeInTheDocument();
  });

  describe('Validation', () => {
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

    it('Not in word list', () => {
      const form = screen.getByRole('textbox');

      // types in 'GONGING'
      userEvent.type(form, 'GONGING{enter}');

      const error = screen.queryByText('Not in word list');
      expect(error).toBeInTheDocument();
    });

    it('Already found', async () => {
      const form = screen.getByRole('textbox');

      // types in 'GONG' and presses enter
      userEvent.type(form, 'GONG{enter}');

      // types in 'GONG' again and presses enter
      userEvent.type(form, 'GONG{enter}');

      const error = screen.queryByText('Already found');
      expect(error).toBeInTheDocument();

      await waitForElementToBeRemoved(error, {
        timeout: 2000,
      });
      expect(error).not.toBeInTheDocument();
    });

    it('Typing clears errors', () => {
      const form = screen.getByRole('textbox');

      // types in 'GONG'
      userEvent.type(form, 'GONG{enter}');

      // types in 'GONG again'
      userEvent.type(form, 'GONG{enter}');

      const error = screen.queryByText('Already found');
      expect(error).toBeInTheDocument();

      userEvent.type(form, 'G');
      expect(error).not.toBeInTheDocument();

      expect((form as HTMLInputElement).value).toEqual('G');
    });
  });

  describe('Delete', () => {
    it('Clicks delete', () => {
      const form = screen.getByRole('textbox');

      userEvent.type(form, 'G');

      expect((form as HTMLInputElement).value).toEqual('G');

      userEvent.click(screen.getByRole('button', { name: 'Delete' }));

      expect((form as HTMLInputElement).value).toEqual('');
    });

    it('Presses delete', () => {
      const form = screen.getByRole('textbox');

      userEvent.type(form, 'G');

      expect((form as HTMLInputElement).value).toEqual('G');

      userEvent.type(form, '{backspace}');

      expect((form as HTMLInputElement).value).toEqual('');
    });
  });
});
