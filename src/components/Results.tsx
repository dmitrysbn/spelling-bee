import FoundWords from './FoundWords';

const Results = ({
  score,
  foundWords,
}: {
  score: number;
  foundWords: string[];
}) => {
  return (
    <div className="container flex flex-col">
      <div className="m-5 font-extrabold text-xl">Score: {score}</div>
      <FoundWords foundWords={foundWords} />
    </div>
  );
};

export default Results;
