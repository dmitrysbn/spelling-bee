import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function Header() {
  return (
    <header>
      <AppBar position="sticky">
        <Toolbar className="justify-center">
          <span className="font-extrabold text-2xl">Spelling Bee :)</span>
        </Toolbar>
      </AppBar>
    </header>
  );
}
