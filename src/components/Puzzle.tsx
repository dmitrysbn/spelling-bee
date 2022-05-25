import { forwardRef, Ref, useCallback, useEffect, useState } from 'react';
import ControlButtons from './ControlButtons';
import { randomizeLetters } from '../utils/randomizeLetters';
import Form from './Form';
import LettersGrid from './LettersGrid';

type PuzzleProps = {
  term: string;
  error: string;
  letters: string;
  mainLetter: string;
  onChange: (event: any, letter?: string) => void;
  onSubmit: (event: any) => void;
  onClickDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPressDelete: (event: any) => void;
};

const Puzzle = (
  {
    term,
    error,
    letters,
    mainLetter,
    onChange,
    onSubmit,
    onClickDelete,
    onPressDelete,
  }: PuzzleProps,
  ref: Ref<HTMLDivElement> | undefined
) => {
  const [lettersArray, setLettersArray] = useState(letters.split(''));
  const [loading, setLoading] = useState(false);

  // TODO: disable functionality of press space for 1 second
  const handlePressSpace = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setLettersArray(prevArray => randomizeLetters(prevArray, mainLetter));
      }
    },
    [mainLetter]
  );

  useEffect(() => {
    document.addEventListener('keydown', handlePressSpace);

    const sorted = randomizeLetters(letters.split(''), mainLetter);
    setLettersArray(sorted);

    return () => {
      document.removeEventListener('keydown', handlePressSpace);
    };
  }, [handlePressSpace, letters, mainLetter]);

  // TODO: make sure no letters are in their old positions
  const handleRefresh = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const sorted = randomizeLetters(lettersArray, mainLetter);
    setLettersArray(sorted);
  };

  return (
    <div className="container flex flex-col justify-center items-center">
      <Form
        ref={ref}
        term={term}
        error={error}
        onChange={onChange}
        onSubmit={onSubmit}
        onPressDelete={onPressDelete}
      />

      <LettersGrid
        letters={lettersArray}
        mainLetter={mainLetter}
        onChange={onChange}
      />

      <ControlButtons
        onRefresh={handleRefresh}
        onSubmit={onSubmit}
        onClickDelete={onClickDelete}
      />
    </div>
  );
};

export default forwardRef(Puzzle);
