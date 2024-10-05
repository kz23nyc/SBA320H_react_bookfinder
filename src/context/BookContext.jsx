import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import bookReducer from '../reducers/bookReducer';

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const initialState = {
    books: [],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

// Add prop types for BookProvider
BookProvider.propTypes = {
  children: PropTypes.node.isRequired, // Define children as a required prop
};

export { BookContext, BookProvider };
