import { useState, useContext } from "react";
import { BookContext } from '../context/BookContext';

export default function SearchBar() {
  // Initialize query state for the search input
  const [query, setQuery] = useState('');
  // Initialize books and loading/error states
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Retrieve dispatch from context
  const { dispatch } = useContext(BookContext);

  // Function to fetch books from API
  const getBooks = async () => {
    if (!query) return; // Prevent fetching if query is empty
    setLoading(true);
    setError(null);
    
    try {
      // Use environment variable for API key
      const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY; 
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (data.items) {
        setBooks(data.items);
        dispatch({ type: 'SET_BOOKS', payload: data.items });
      } else {
        setError('No books found.');
        dispatch({ type: 'SET_ERROR', payload: 'No books found.' });
      }
    } catch (err) {
      console.error('Error fetching books:', err.message);
      setError(`Failed to fetch books: ${err.message}`);
      dispatch({ type: 'SET_ERROR', payload: `Failed to fetch books: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  // Handling search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (query) getBooks(); // Fetch only when a query exists
  };

  // Loaded function for when books are available
  const loaded = () => {
    return books ? (
      <div>
        <h2>Search Results:</h2>
        <ul>
          {books.map(book => (
            <li key={book.id}>{book.volumeInfo.title}</li>
          ))}
        </ul>
      </div>
    ) : null;
  };

  // Display while loading
  const loadingMessage = () => <h2>Loading...</h2>;

  // Return the component structure
  return (
    <div>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>
      
      {/* Conditionally render content based on loading or error state */}
      {loading ? loadingMessage() : error ? <h2>{error}</h2> : loaded()}
    </div>
  );
}

const styles = {
  form: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem 0',
  },
  input: {
    width: '300px',
    padding: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    marginLeft: '1rem',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};
