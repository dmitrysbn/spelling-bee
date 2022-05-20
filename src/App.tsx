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
  createScore,
  getCurrentPuzzleId,
  getScore,
  updateScore,
} from './repository/repository';

type Score = {
  id: string;
  words: string;
  points: number;
};

const App = ({
  puzzle,
  mainLetter,
}: {
  puzzle: string;
  mainLetter: string;
}) => {
  const [puzzleId, setPuzzleId] = useState('');
  const [score, setScore] = useState<Score>({
    id: '0',
    words: '[]',
    points: 0,
  });

  const [term, setTerm] = useState('');
  const [error, setError] = useState('');
  const [errorTimeout, setErrorTimeout] = useState(0);

  const inputRef = useRef(document.createElement('div'));

  useEffect(() => {
    getCurrentPuzzleId(setPuzzleId);
  }, []);

  useEffect(() => {
    const getOrCreateScore = async ({
      userId,
      puzzleId,
    }: {
      userId: string;
      puzzleId: string;
    }) => {
      if (puzzleId) {
        const existingScore = await getScore({ userId, puzzleId });

        if (existingScore) {
          setScore(existingScore);
        } else {
          const newScore = await createScore({ userId, puzzleId });
          setScore(newScore);
        }
      }
    };

    getOrCreateScore({ userId: 'dmitry', puzzleId });
  }, [puzzleId]);

  useEffect(() => {
    if (inputRef.current) {
      focusInput();
    }
  }, [error]);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const onSubmit = async (
    event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!term) {
      return;
    }

    let validationError = validateTerm({
      term,
      puzzle,
      legalWords,
      mainLetter,
      foundWords: JSON.parse(score.words),
    });

    if (!validationError) {
      const updatedScore = await updateScore({
        scoreId: score.id,
        userId: 'dmitry',
        puzzleId,
        word: term,
      });

      if (updatedScore.points === score.points) {
        validationError = 'Not in word list';
      } else {
        setScore(updatedScore);
        setTerm('');
      }
    }

    if (validationError) {
      setError(validationError);
      const timeoutId = window.setTimeout(() => {
        setError('');
        setTerm('');
      }, 1000);

      setErrorTimeout(timeoutId);

      return;
    }
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
          <Results score={score.points} foundWords={JSON.parse(score.words)} />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
