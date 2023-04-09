// react
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// context
import { UserContext } from "../context/UserContext";
import { LightDarkContext } from "../context/LightDarkContext";
// auth
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// styles
import "../assets/styles/pages/Login.css"
// components
import Navbar from "../components/Navbar";
import ErrorBanner from "../components/ErrorBanner";

function Login() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  // context
  const {username, setUsername} = useContext(UserContext);
  const {errorMessage, setErrorMessage} = useContext(UserContext)
  const { lightDark } = useContext(LightDarkContext)

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }

    if (user) navigate("/");
  }, [user, loading]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      const message = error.code
      setErrorMessage(message.split("/")[1].split("-").join(" "));
    })
  }

  const handleGuest = () => {
    setUsername("guest")
    navigate("/");
  }

  const handleError = errorMessage ? <ErrorBanner errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> : null;

  return (
    <div className={`Login ${lightDark}`}>
      <Navbar />
      {handleError}
      <div className="Login-Container">
        <div className="Login-Main">
          <h1>Login</h1>
          <input
            type="text"
            className="Login-Text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="Login-Text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="Login-Btn"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="Login-Btn"
            onClick={handleGuest}
          >
            Continue as Guest
          </button>
          <button className="Login-Btn Login-Google" onClick={signInWithGoogle}>
            Login with Google
          </button>
          <div>
            <Link className="Form-Forgot" to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link className="Form-Forgot" to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;