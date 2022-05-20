import './App.css';
import Header from './components/Header';
import Puzzle from './components/Puzzle';
import Results from './components/Results';
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
import {
  getCurrentPuzzleId,
  getScore,
  validateWord,
} from './repository/repository';

const App = ({
  puzzle,
  mainLetter,
}: {
  puzzle: string;
  mainLetter: string;
}) => {
  const [puzzleId, setPuzzleId] = useState('');
  const [term, setTerm] = useState('');
  const [error, setError] = useState('');
  const [errorTimeout, setErrorTimeout] = useState(0);
  const [score, setScore] = useState(() => {
    const storedScoreString = localStorage.getItem('score');

    return storedScoreString ? parseInt(storedScoreString) : 0;
  });
  const [foundWords, setFoundWords] = useState(() => {
    const storedWordsString = localStorage.getItem('foundWords');

    return storedWordsString ? JSON.parse(storedWordsString) : [];
  });

  const inputRef = useRef(document.createElement('div'));

  useEffect(() => {
    getCurrentPuzzleId(setPuzzleId);

    if (puzzleId) {
      getScore({ userId: 'dmitry', puzzleId });
    }
  }, [puzzleId]);

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

    // const isValid = validateWord(term, puzzleId);

    foundWords.push(term);
    const newScore = score + term.length;

    setTerm('');
    setScore(newScore);

    window.localStorage.setItem('foundWords', JSON.stringify(foundWords));
    window.localStorage.setItem('score', newScore.toString());
    setFoundWords(foundWords);
  };

  // TODO: fix any type
  const onChange = (event: any, letter?: string) => {
    // if pressed Space
    if (event.nativeEvent.data === ' ') {
      return;
    }

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

  const handleDeletePressError = ({ nativeEvent }: { nativeEvent: any }) => {
    if (error && nativeEvent.key === 'Backspace') {
      setTerm('');
      setError('');
      clearTimeout(errorTimeout);
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
            puzzle={puzzle}
            mainLetter={mainLetter}
            onChange={onChange}
            onSubmit={onSubmit}
            onClickDelete={onClickDelete}
            onPressDelete={handleDeletePressError}
          />
          <Results score={score} foundWords={foundWords} />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
