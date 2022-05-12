import bee from './images/bee.png';
import './App.css';
import Header from './components/Header';
import LettersList from './components/LettersList';
import Form from './components/Form';
import FoundWords from './components/FoundWords';
import { FormEvent, useEffect, useState } from 'react';

const puzzle = 'HOCIGEDNT';
const mainLetter = 'G';

const App = () => {
  const [term, setTerm] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);

  // useEffect(() => {
  //   console.log('found word!');
  // }, [foundWords]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newWords = foundWords;
    newWords.push(term);

    setTerm('');

    setFoundWords(newWords);
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />

      <div className="flex justify-center">
        <Form term={term} setTerm={setTerm} onSubmit={onSubmit} />
      </div>

      <div className="container flex flex-row gap-5 mt-6">
        <LettersList puzzle={puzzle} mainLetter={mainLetter} />
        <FoundWords foundWords={foundWords} />
      </div>

      <footer className="flex justify-center">
        <img src={bee} alt="" width="48" height="48" />
      </footer>
    </div>
  );
};

export default App;
