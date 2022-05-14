import whiteBee from '../images/bee_white.png';

const Footer = () => {
  return (
    <footer className="flex justify-center">
      <a
        href="https://github.com/dmitrysbn/spelling-bee"
        target="_blank"
        rel="noreferrer"
      >
        <img src={whiteBee} alt="" width="48" height="48" className="mb-2" />
      </a>
    </footer>
  );
};

export default Footer;
