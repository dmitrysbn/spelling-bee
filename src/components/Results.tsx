import WordItem from './WordItem';

const Results = ({
  score,
  foundWords,
}: {
  score: number;
  foundWords: string[];
}) => {
  const foundWordList = (
    <ul>
      {foundWords.map(word => {
        return (
          <WordItem
            key={word}
            word={word[0] + word.substring(1).toLowerCase()}
          />
        );
      })}
    </ul>
  );

  return (
    <div className="container flex flex-col">
      <div>Score: {score}</div>
      <div className="container w-full h-full border rounded-xl">
        <div className="m-5 mb-0">
          You have found {foundWords.length}{' '}
          {foundWords.length === 1 ? 'word' : 'words'}
        </div>
        <div className="container flex m-5">{foundWordList}</div>
      </div>
    </div>
  );
};

export default Results;
