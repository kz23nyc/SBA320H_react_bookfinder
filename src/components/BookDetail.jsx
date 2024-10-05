import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching book detail:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]); // Only depend on id here

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (error) return <p style={styles.message}>Error loading book details.</p>;
  if (!book) return <p style={styles.message}>No book found.</p>;

  const { volumeInfo } = book;

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>← Back to Search</Link>
      <div style={styles.detail}>
        <img
          src={volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x195.png?text=No+Image'}
          alt={volumeInfo.title}
          style={styles.image}
        />
        <div style={styles.info}>
          <h2>{volumeInfo.title}</h2>
          <h3>{volumeInfo.authors?.join(', ')}</h3>
          <p><strong>Publisher:</strong> {volumeInfo.publisher}</p>
          <p><strong>Published Date:</strong> {volumeInfo.publishedDate}</p>
          <p>{volumeInfo.description}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
  },
  backLink: {
    textDecoration: 'none',
    color: '#61dafb',
    marginBottom: '1rem',
    display: 'inline-block',
  },
  detail: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  image: {
    width: '200px',
    height: '300px',
    objectFit: 'cover',
    marginRight: '2rem',
  },
  info: {
    maxWidth: '600px',
  },
  message: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '1.2rem',
  },
};

export default BookDetail;
