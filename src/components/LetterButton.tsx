import Box from '@mui/material/Box';

const LetterButton = ({
  letter,
  main = false,
}: {
  letter: string;
  main?: boolean;
}) => {
  return (
    <div className={`${main ? 'bg-[#f7da21]' : 'bg-[#e6e6e6]'}`}>
      <button
        className="box-border h-16 w-16 p-4 border-2"
        onClick={() => console.log('hello')}
      >
        <span className="font-bold text-xl">{letter}</span>
      </button>
    </div>
  );
};

export default LetterButton;
