import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';


const BookList = () => {
  const { state } = useContext(BookContext); // access to the global state by BookContext in the app
  const { books, loading, error } = state; // pull out the books, loading, error properties from the state to use them in our component logic

  //conditional rendering
  if (loading) return <p style={styles.message}>Loading...</p>;// Loading State
  if (error) return <p style={styles.message}>{error}</p>;// error State
  // if the books array is empty or undefined
  if (!books || books.length === 0) return <p style={styles.message}>No books found.</p>;

  // rendering the book list
  return (
    //wrapper div container style, map() method and key prop
    <div style={styles.container}> 
      {books.map(book => (
        <div key={book.id} style={styles.book}>
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x195.png?text=No+Image'}
            alt={book.volumeInfo.title}
            style={styles.image}
          />
          <h3>{book.volumeInfo.title}</h3>
          <p>{book.volumeInfo.authors?.join(', ')}</p>
          <Link to={`/book/${book.id}`} style={styles.link}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  book: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '1rem',
    margin: '1rem',
    width: '200px',
    textAlign: 'center',
  },
  image: {
    width: '128px',
    height: '195px',
    objectFit: 'cover',
  },
  link: {
    display: 'inline-block',
    marginTop: '0.5rem',
    padding: '0.5rem',
    backgroundColor: '#61dafb',
    color: 'black',
    textDecoration: 'none',
    borderRadius: '5px',
  },
  message: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '1.2rem',
  },
};

export default BookList;
