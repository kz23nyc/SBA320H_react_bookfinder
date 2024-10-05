// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import About from './components/About';
import { BookProvider } from './context/BookContext';

const App = () => (
  <BookProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar />
              <BookList />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  </BookProvider>
);

export default App;
