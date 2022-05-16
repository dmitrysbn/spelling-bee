const LetterButton = ({
  letter,
  main = false,
  onClick,
}: {
  letter: string;
  main?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>, letter: string) => void;
}) => {
  return (
    <div
      className={`${
        main ? 'bg-[#f7da21] main-letter' : 'bg-[#e6e6e6]'
      } rounded-md border-2`}
      data-testid={main ? 'main-letter' : ''}
    >
      <button
        className="box-border h-16 w-16 p-4"
        onClick={e => onClick(e, letter)}
      >
        <span className="font-bold text-xl">{letter}</span>
      </button>
    </div>
  );
};

export default LetterButton;
