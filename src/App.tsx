import bee from './images/bee.png';
import './App.css';
import Header from './components/Header';
import LettersList from './components/LettersList';
import Form from './components/Form';
import FoundWords from './components/FoundWords';
import { BaseSyntheticEvent, FormEvent, useState } from 'react';

const puzzle = 'HOCIGEDNT';
const mainLetter = 'G';

const App = () => {
  const [term, setTerm] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    foundWords.push(term);

    setTerm('');
    setFoundWords(foundWords);
  };

  const onChange = (event: BaseSyntheticEvent, letter?: string) => {
    if (event.type === 'change') {
      setTerm(event.target.value);
    } else if (event.type === 'click') {
      const newTerm = letter ? term + letter : term;
      setTerm(newTerm);
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
