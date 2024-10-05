import { useState, useContext } from "react";
import { BookContext } from '../context/BookContext';


const SearchBar = () => {
  // initialize the query state to an empty string, controlled state for the search input
  const [query, setQuery] = useState(''); 
  // retrieves the dispatch function from the BookContext.
  const{ dispatch } = useContext(BookContext);

  //handleSearch function
  const handleSearch = async (e) => {
    e.preventDefault();
    if(!query) return;

   //dispatching the set_loading action 
    dispatch({type: 'SET_LOADING'});

    // fetching Books for the API
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY; // Ensure you have the correct API key
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`); // Use apiKey in the fetch URL
      const data = await response.json();
      
      if (data.items) {
        dispatch({ type: 'SET_BOOKS', payload: data.items });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'No books found.' });
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch books.' });
    }
};
  return (
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
  );
};

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

export default SearchBar;