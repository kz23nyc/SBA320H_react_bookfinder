const About = () => (
  <div style={styles.container}>
    <h2>About BookFinder</h2>
    <p>
      BookFinder is a simple React application that allows users to search for books.
      You can search by title, author, or keyword and view detailed information about each book.
    </p>
  </div>
);

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
};

export default About;
