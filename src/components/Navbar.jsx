// import from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={styles.nav}>
    <h1>BookFinder</h1>
    <div>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/about" style={styles.link}>About</Link>
    </div>
  </nav>
);

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#282c34',
    color: 'white',
  },
  link: {
    margin: '0 1rem',
    color: 'white',
    textDecoration: 'none',
  },
};

export default Navbar;
