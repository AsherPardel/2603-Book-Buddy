import { useState, useContext } from "react";
import { Link } from "react-router";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { useNavigate } from "react-router";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  //
  //
  //
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );
    const result = await response.json();
    console.log(email, "email", password, "password");
    console.log(result);

    login({}, result.token);
    navigate("/account");
  }

  return (
    <>
      <h1>Login to Your Account</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Login</button>
      </form>
      <Link to="/register">Need an account? Register here.</Link>
    </>
  );
}
//
//
export function RegisterAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const { login } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email,
          password,
        }),
      },
    );
    console.log(response.status);
    console.log(response.statusText);

    const result = await response.json();
    console.log("result", result);
    login({}, result.token);
    navigate("/account");
  }

  return (
    <>
      <h1>Register an Account</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          placeholder="firstname"
          value={firstName}
          onChange={(event) => SetFirstName(event.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          placeholder="lastname"
          value={lastName}
          onChange={(event) => SetLastName(event.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Register</button>
      </form>
      <Link to="/">Already have an account? Log in here.</Link>
    </>
  );
}
