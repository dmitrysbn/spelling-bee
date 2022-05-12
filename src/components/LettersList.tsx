import LetterButton from './LetterButton';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import ControlButtons from './ControlButtons';
import { randomizeLetters } from '../utils/utils';

const LettersList = ({
  puzzle,
  mainLetter,
  onClick,
  onSubmit,
}: {
  puzzle: string;
  mainLetter: string;
  onClick: (event: BaseSyntheticEvent, letter: string) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const [lettersArray, setLettersArray] = useState(puzzle.split(''));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sorted = randomizeLetters(puzzle.split(''), mainLetter);
    setLettersArray(sorted);
  }, [puzzle, mainLetter]);

  // TODO: make sure no letters are in their old positions
  const handleRefresh = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

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

      <ControlButtons onRefresh={handleRefresh} onSubmit={onSubmit} />
    </div>
  );
};

export default LettersList;
