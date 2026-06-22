import { API, BASE, RESOURCE } from "./API";
import { useState, useEffect } from "react";
import DescriptionPage from "./description-page";
import { Link } from "react-router";

export function Catalog() {
  const [books, setBooks] = useState([]);
  async function getBooks() {
    try {
      const response = await fetch(API);
      const result = await response.json();
      setBooks(result);
      // console.log("result", result);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);
  // console.log("books", books);
  return (
    <>
      <h1>Catalog</h1>
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <img className="coverpic" src={book.coverimage} alt={book.title} />
          <Link className="title" to={`/book/${book.id}`}>
            {book.title}
          </Link>
          <h4>{book.author}</h4>
        </div>
      ))}
    </>
  );
}
