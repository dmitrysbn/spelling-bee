import LetterButton from './LetterButton';
import { BaseSyntheticEvent, useCallback, useEffect, useState } from 'react';
import ControlButtons from './ControlButtons';
import { randomizeLetters } from '../utils/randomizeLetters';

const LettersList = ({
  puzzle,
  mainLetter,
  onClick,
  onSubmit,
  onClickDelete,
}: {
  puzzle: string;
  mainLetter: string;
  onClick: (event: BaseSyntheticEvent, letter: string) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
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

  const lettersList = lettersArray.map((letter: string) => (
    <LetterButton
      key={letter}
      letter={letter}
      main={letter === mainLetter}
      onClick={onClick}
    />
  ));

  return (
    <div className="container flex flex-col items-center">
      <div className="grid grid-cols-3 gap-5 mt-10 items-stretch text-center justify-items-center">
        {lettersList}
      </div>

      <ControlButtons
        onRefresh={handleRefresh}
        onSubmit={onSubmit}
        onClickDelete={onClickDelete}
      />
    </div>
  );
};

export default LettersList;
