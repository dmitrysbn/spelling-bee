import { forwardRef, Ref, useCallback, useEffect, useState } from 'react';
import ControlButtons from './ControlButtons';
import { randomizeLetters } from '../utils/randomizeLetters';
import Form from './Form';
import LettersGrid from './LettersGrid';

const Puzzle = (
  {
    term,
    error,
    puzzle,
    mainLetter,
    onChange,
    onSubmit,
    onClickDelete,
  }: {
    term: string;
    error: string;
    puzzle: string;
    mainLetter: string;
    onChange: (event: any, letter?: string) => void;
    onSubmit: (event: any) => void;
    onClickDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  },
  ref: Ref<HTMLDivElement> | undefined
) => {
  const [lettersArray, setLettersArray] = useState(puzzle.split(''));
  const [loading, setLoading] = useState(false);

  // TODO: disable functionality of press space for 1 second
  const handlePressSpace = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        // if (loading) {
        //   return;
        // }
        // console.log('space');

        // setLoading(true);

        // setTimeout(() => {
        //   setLoading(false);
        // }, 1000);

        setLettersArray(prevArray => randomizeLetters(prevArray, mainLetter));
      }
    },
    [mainLetter]
  );

  useEffect(() => {
    document.addEventListener('keydown', handlePressSpace);

    const sorted = randomizeLetters(puzzle.split(''), mainLetter);
    setLettersArray(sorted);

    return () => {
      document.removeEventListener('keydown', handlePressSpace);
    };
  }, [handlePressSpace, puzzle, mainLetter]);

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
