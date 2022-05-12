import WordItem from './WordItem';

const FoundWords = () => {
  return (
    <div className="container flex flex-col border-solid border rounded-xl">
      <div className="m-5 mb-0">You have found x words</div>
      <div className="container flex m-5">
        <ul>
          <WordItem word="Hello" />
          <WordItem word="World" />
          <WordItem word="This" />
          <WordItem word="Is" />
          <WordItem word="Dmitry" />
        </ul>
      </div>
    </div>
  );
};

export default FoundWords;
