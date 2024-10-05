export const initialState = {
    books: [],
    loading: false,
    error: null,
  };
  
  export const bookReducer = (state, action) => {
    switch (action.type) {
      case 'SET_LOADING':
        return { ...state, loading: true, error: null };
      case 'SET_BOOKS':
        return { ...state, books: action.payload, loading: false };
      case 'SET_ERROR':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };

  export default bookReducer; 