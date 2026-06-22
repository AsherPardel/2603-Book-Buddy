import { useState, useEffect, useContext } from "react";
import { Link, Routes, Route } from "react-router";
import { API } from "./API";
//
//
import { Login, RegisterAccount } from "./login-&-register";
import AccountPage from "./account-page";
import { Catalog } from "./Catalog";
import { AuthContext } from "./contexts/AuthContext";
import DescriptionPage from "./description-page";
//import API
//
// user: asherpardel@gmail.com
// pass: booksarecool
//
export default function App() {
  function NavBar() {
    const { user, logout } = useContext(AuthContext);
    return (
      <nav className="navbar">
        <h3>Book Buddy</h3>
        <navbar className="links">
          <Link to="/catalog">Catalog</Link>
          <Link to="/account">Account</Link>
          <Link to="/">Login</Link>
        </navbar>
      </nav>
    );
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/book/:id" element={<DescriptionPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterAccount />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </>
  );
}
