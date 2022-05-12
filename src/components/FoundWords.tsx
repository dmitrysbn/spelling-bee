import WordItem from './WordItem';

const FoundWords = ({ foundWords }: { foundWords: string[] }) => {
  const foundWordList = (
    <ul>
      {foundWords.map(word => {
        return <WordItem key={word} word={word} />;
      })}
    </ul>
  );

  return (
    <div className="container flex flex-col border-solid border rounded-xl">
      <div className="m-5 mb-0">You have found {foundWords.length} words</div>
      <div className="container flex m-5">{foundWordList}</div>
    </div>
  );
};

export default FoundWords;
