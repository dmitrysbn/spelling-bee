import LetterButton from './LetterButton';

const LettersGrid = ({
  letters,
  mainLetter,
  onChange,
}: {
  letters: string[];
  mainLetter: string;
  onChange: (event: any, letter?: string) => void;
}) => {
  return (
    <div className="grid grid-cols-3 gap-5 mt-10 items-stretch text-center justify-items-center">
      {letters.map((letter: string) => (
        <LetterButton
          key={letter}
          letter={letter}
          main={letter === mainLetter}
          onClick={onChange}
        />
      ))}
    </div>
  );
};

export default LettersGrid;
