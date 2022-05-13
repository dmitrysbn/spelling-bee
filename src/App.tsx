import bee from './images/bee_white.png';
import './App.css';
import Header from './components/Header';
import LettersList from './components/LettersList';
import Form from './components/Form';
import FoundWords from './components/FoundWords';
import {
  BaseSyntheticEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { legalWords } from './utils/legalWords';
import { validateTerm } from './utils/validateTerm';

const puzzle = 'HOCIGEDNT';
const mainLetter = 'G';

const storedWordsString = localStorage.getItem('foundWords');
const storedWords = storedWordsString ? JSON.parse(storedWordsString) : [];

const App = () => {
  const [term, setTerm] = useState('');
  const [error, setError] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>(storedWords);

  const inputRef = useRef(document.createElement('div'));

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  const focusInput = () => {
    console.log('focus');
    console.log(inputRef);

    inputRef.current.focus();
  };

  const onSubmit = (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!term) {
      return;
    }

    const error = validateTerm({
      term,
      puzzle,
      legalWords,
      mainLetter,
      foundWords,
    });

    if (error) {
      setError(error);
      setTimeout(() => {
        setError('');
        setTerm('');
      }, 1000);
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
    <div className="w-screen" onClick={focusInput}>
      <div className="flex flex-col justify-between h-screen">
        <Header />

        <div className="flex justify-center h-1/6">
          <div className="flex flex-col justify-end">
            <div className="text-center align-bottom mb-5">{error}</div>
            <div className="sticky bottom-0">
              <Form
                ref={inputRef}
                term={term}
                disabled={!!error}
                onChange={onChange}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>

        <div className="container flex flex-row justify-center gap-5 mt-6">
          <LettersList
            onClick={onChange}
            onSubmit={onSubmit}
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
    </div>
  );
};

export default App;
