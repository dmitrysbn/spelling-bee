import './App.css';
import Header from './components/Header';
import Puzzle from './components/Puzzle';
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
import Footer from './components/Footer';

const App = ({
  puzzle,
  mainLetter,
}: {
  puzzle: string;
  mainLetter: string;
}) => {
  const [term, setTerm] = useState('');
  const [error, setError] = useState('');
  const [errorTimeout, setErrorTimeout] = useState(0);
  const [foundWords, setFoundWords] = useState(() => {
    const storedWordsString = localStorage.getItem('foundWords');

    return storedWordsString ? JSON.parse(storedWordsString) : [];
  });

  const inputRef = useRef(document.createElement('div'));

  useEffect(() => {
    if (inputRef.current) {
      focusInput();
    }
  }, [error]);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const onSubmit = (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!term) {
      return;
    }

    const validationError = validateTerm({
      term,
      puzzle,
      legalWords,
      mainLetter,
      foundWords,
    });

    if (validationError) {
      setError(validationError);
      const timeoutId = window.setTimeout(() => {
        setError('');
        setTerm('');
      }, 1000);

      setErrorTimeout(timeoutId);

      return;
    }

    foundWords.push(term);

    setTerm('');

    window.localStorage.setItem('foundWords', JSON.stringify(foundWords));
    setFoundWords(foundWords);
  };

  const onChange = (event: BaseSyntheticEvent, letter?: string) => {
    if (error) {
      setError('');
      clearTimeout(errorTimeout);
    }

    if (event.type === 'change') {
      let { value } = event.target;

      if (error) {
        value = value.charAt(value.length - 1);
      }

      const re = /^[A-Za-z]+$/;

      if (value === '' || re.test(value)) {
        setTerm(value.toUpperCase());
      }
    } else if (event.type === 'click') {
      if (error) {
        setTerm(() => '' + letter);
      } else {
        const newTerm = letter ? term + letter : term;

        setTerm(newTerm.toUpperCase());
      }
    }
  };

  const onClickDelete = (event: BaseSyntheticEvent): void => {
    if (error) {
      setTerm('');
      setError('');
      return;
    }

    const newTerm = term.slice(0, term.length - 1);
    setTerm(newTerm.toUpperCase());
  };

  return (
    <div className="w-screen" onClick={focusInput}>
      <div className="flex flex-col justify-between h-screen">
        <Header />

        <div className="container align-center h-4/6 w-5/6 flex gap-5 mt-6">
          <Puzzle
            ref={inputRef}
            term={term}
            error={error}
            onChange={onChange}
            onSubmit={onSubmit}
            onClickDelete={onClickDelete}
            puzzle={puzzle}
            mainLetter={mainLetter}
          />
          <FoundWords foundWords={foundWords} />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
