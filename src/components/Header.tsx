import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { format } from 'date-fns';
import bee from '../images/bee_yellow.png';

export default function Header() {
  const date = new Date();

  const formattedDate = format(date, 'PP');

  return (
    <header>
      <AppBar position="sticky">
        <Toolbar className="justify-center">
          <span className="font-extrabold text-2xl">
            Spelling Bee :) &nbsp;
          </span>
          <br />
          <span className="font-thin text-xl">{formattedDate}</span>
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
