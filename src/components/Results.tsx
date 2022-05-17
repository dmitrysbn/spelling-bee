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
      <div>Score: {score}</div>
      <FoundWords foundWords={foundWords} />
    </div>
  );
};

export default Results;
