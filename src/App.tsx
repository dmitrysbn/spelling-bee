import bee from './images/bee.png';
import './App.css';
import Header from './components/Header';
import LettersList from './components/LettersList';
import Form from './components/Form';
import FoundWords from './components/FoundWords';
import { BaseSyntheticEvent, FormEvent, useState } from 'react';
import { legalWords } from './utils/legalWords';

const puzzle = 'HOCIGEDNT';
const mainLetter = 'G';

const storedWordsString = localStorage.getItem('foundWords');
const storedWords = storedWordsString ? JSON.parse(storedWordsString) : [];

const App = () => {
  const [term, setTerm] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>(storedWords);

  const onClickEnter = (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    setTerm('');

    if (!legalWords.includes(term.toLowerCase()) || foundWords.includes(term)) {
      return;
    }

    foundWords.push(term);

    localStorage.setItem('foundWords', JSON.stringify(foundWords));
    setFoundWords(foundWords);
  };

  const onChange = (event: BaseSyntheticEvent, letter?: string) => {
    if (event.type === 'change') {
      setTerm(event.target.value.toUpperCase());
    } else if (event.type === 'click') {
      const newTerm = letter ? term + letter : term;
      setTerm(newTerm.toUpperCase());
    }
  };

  const onClickDelete = (event: BaseSyntheticEvent): void => {
    const newTerm = term.slice(0, term.length - 1);
    setTerm(newTerm.toUpperCase());
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />

      <div className="flex justify-center">
        <Form term={term} onChange={onChange} onClickEnter={onClickEnter} />
      </div>

      <div className="container flex flex-row gap-5 mt-6">
        <LettersList
          onClick={onChange}
          onClickEnter={onClickEnter}
          onClickDelete={onClickDelete}
          puzzle={puzzle}
          mainLetter={mainLetter}
        />
        <FoundWords foundWords={foundWords} />
      </div>

      <footer className="flex justify-center">
        <a
          href="https://github.com/dmitrysbn/spelling-bee"
          target="_blank"
          rel="noreferrer"
        >
          <img src={bee} alt="" width="48" height="48" />
        </a>
      </footer>
    </div>
  );
};

export default App;
