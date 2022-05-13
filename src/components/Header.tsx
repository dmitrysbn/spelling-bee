import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import bee from '../images/bee_yellow.png';

export default function Header() {
  return (
    <header>
      <AppBar position="sticky">
        <Toolbar className="justify-center">
          <span className="font-extrabold text-2xl">Spelling Bee :)</span>
          <a
            href="https://www.nytimes.com/puzzles/spelling-bee"
            target="_blank"
            rel="noreferrer"
            className="mx-5"
          >
            <img src={bee} alt="" width="48" height="48" />
          </a>
        </Toolbar>
      </AppBar>
    </header>
  );
}
