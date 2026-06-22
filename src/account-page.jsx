import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { USER_API } from "./API";
import { Link } from "react-router";
import { RESERVATION_API } from "./API";
//
//
export default function AccountPage() {
  const { user, token } = useContext(AuthContext);
  const [account, setAccount] = useState(null);
  console.log("user, token", user, token);
  async function getUser() {
    try {
      const response = await fetch(USER_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log("result", result);
      setAccount(result);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  console.log(account?.reservations);
  //
  //
  async function returnBook(id) {
    try {
      const response = await fetch(`${RESERVATION_API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.status);
      getUser();
    } catch (e) {
      console.error(e);
    }
  }
  //
  //
  return (
    <>
      <h1>Welcome, {account?.firstname}!</h1>
      <p>your email on file with us is {account?.email}.</p>
      <h3>Your Reserved Books</h3>

      {account?.reservations?.length > 0 ? (
        account?.reservations.map((book) => (
          <div key={book.id} className="book-card">
            <img className="coverpic" src={book.coverimage} alt={book.title} />
            <Link to={`/book/${book.id}`}>{book.title}</Link>
            <h4>{book.author}</h4>
            <button onClick={() => returnBook(book.id)}>return book</button>
          </div>
        ))
      ) : (
        <p>you dont have any reserved</p>
      )}
    </>
  );
}
