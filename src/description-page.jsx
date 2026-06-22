import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import { API, BASE, RESERVATION_API, RESOURCE } from "./API";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
//
//
export default function DescriptionPage() {
  const [selectedBook, setSelectedBook] = useState({});
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  console.log(id);
  //
  //
  async function getBook() {
    try {
      const response = await fetch(API + "/" + id);
      const result = await response.json();
      setSelectedBook(result);
      console.log("result", result);
    } catch (e) {
      console.error(e);
    }
  }
  //
  useEffect(() => {
    getBook();
  }, []);
  console.log("selectedBook", selectedBook);
  //
  async function reserveBook() {
    try {
      const response = await fetch(RESERVATION_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: selectedBook.id,
        }),
      });
      const result = await response.json();
      console.log(result);
      getBook();
    } catch (e) {
      console.error(e);
    }
  }
  //
  return (
    <>
      <img
        className="coverpic"
        src={selectedBook.coverimage}
        alt={selectedBook.title}
      />
      <h1>{selectedBook.title}</h1>
      <h3>{selectedBook.author}</h3>
      <p>{selectedBook.description}</p>
      {selectedBook.available ? (
        <button onClick={() => reserveBook()}>Reserve Book</button>
      ) : (
        <button>This book is already reserved</button>
      )}
    </>
  );
}
