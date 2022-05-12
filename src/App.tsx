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

const App = () => {
  const [term, setTerm] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const onSubmit = (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    setTerm('');

    if (!legalWords.includes(term.toLowerCase())) {
      return;
    }

    foundWords.push(term);

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

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />

      <div className="flex justify-center">
        <Form term={term} onChange={onChange} onSubmit={onSubmit} />
      </div>

      <div className="container flex flex-row gap-5 mt-6">
        <LettersList
          onClick={onChange}
          onSubmit={onSubmit}
          puzzle={puzzle}
          mainLetter={mainLetter}
        />
        <FoundWords foundWords={foundWords} />
      </div>

      <footer className="flex justify-center">
        <img src={bee} alt="" width="48" height="48" />
      </footer>
    </div>
  );
};

export default App;
