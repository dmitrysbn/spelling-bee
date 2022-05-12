import refresh from '../images/refresh.svg';
import Button from '@mui/material/Button';
import LetterButton from './LetterButton';
import { useState } from 'react';

const LettersList = ({
  puzzle,
  mainLetter,
}: {
  puzzle: string;
  mainLetter: string;
}) => {
  const [lettersArray, setLettersArray] = useState(puzzle.split(''));

  // TODO: make sure no letters are in their old positions
  const handleRefresh = () => {
    const nonMainLetters = lettersArray.filter(letter => letter !== mainLetter);

    const sorted = nonMainLetters
      .sort(() => {
        return 0.5 - Math.random();
      })
      .splice(4, 0, mainLetter);

    setLettersArray(sorted);
  };

  const lettersList = lettersArray.map((letter: string) => {
    if (letter === mainLetter) {
      return <LetterButton key={letter} letter={letter} main={true} />;
    }
    return <LetterButton key={letter} letter={letter} />;
  });

  return (
    <div className="container flex flex-col items-center border-solid border-2">
      <div className="grid grid-cols-3 gap-5 mt-10 items-stretch text-center justify-items-center">
        {lettersList}
      </div>

      <div className="justify-center my-10 flex flex-row space-x-4">
        <div>
          <Button variant="contained" sx={{ fontWeight: 'bold' }}>
            Delete
          </Button>
        </div>
        <div>
          <Button
            variant="outlined"
            sx={{ fontWeight: 'bold' }}
            onClick={handleRefresh}
          >
            <img src={refresh} width="26" />
          </Button>
        </div>
        <div>
          <Button variant="contained" sx={{ fontWeight: 'bold' }}>
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LettersList;
