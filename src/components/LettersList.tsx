import LetterButton from './LetterButton';
import { useState } from 'react';
import ControlButtons from './ControlButtons';

const randomizeLetters = (
  lettersArray: string[],
  mainLetter: string
): string[] => {
  const nonMainLetters = lettersArray.filter(letter => letter !== mainLetter);

  const sorted = nonMainLetters.sort(() => {
    return 0.5 - Math.random();
  });
  sorted.splice(4, 0, mainLetter);

  return sorted;
};

const LettersList = ({
  puzzle,
  mainLetter,
}: {
  puzzle: string;
  mainLetter: string;
}) => {
  const [lettersArray, setLettersArray] = useState(puzzle.split(''));
  const [loading, setLoading] = useState(false);

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
    <LetterButton key={letter} letter={letter} main={letter === mainLetter} />
  ));

  return (
    <div className="container flex flex-col items-center border-solid border-2">
      <div className="grid grid-cols-3 gap-5 mt-10 items-stretch text-center justify-items-center">
        {lettersList}
      </div>

      <ControlButtons onRefresh={handleRefresh} />
    </div>
  );
};

export default LettersList;
