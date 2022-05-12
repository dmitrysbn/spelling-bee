import bee from './images/bee.png';
import './App.css';
import Header from './components/Header';
import LettersList from './components/LettersList';
import FormPropsTextFields from './components/Form';
import FoundWords from './components/FoundWords';

const puzzle = 'HOCIGEDNT';
const mainLetter = 'G';

const App = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />

      <div>
        <FormPropsTextFields />
      </div>

      <div className="container flex flex-row gap-5 mt-6">
        <LettersList puzzle={puzzle} mainLetter={mainLetter} />
        <FoundWords />
      </div>

      <footer className="flex justify-center">
        <img src={bee} width="48" height="48" />
      </footer>
    </div>
  );
};

export default App;
