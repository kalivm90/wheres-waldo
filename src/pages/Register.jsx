// react
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
// auth
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../util/firebase";
// context
import { LightDarkContext } from "../context/LightDarkContext";
import { UserContext } from "../context/UserContext";
// components 
import Navbar from "../components/Navbar";
import ErrorBanner from "../components/ErrorBanner";
// styles
import "../assets/styles/pages/Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  // context
  const {lightDark} = useContext(LightDarkContext)
  const {username, setUsername} = useContext(UserContext);
  const {errorMessage, setErrorMessage} = useContext(UserContext);

  const history = useNavigate();

  const register = () => {
    if (!name) {
      setErrorMessage("Did you forget your name")
    } else if (!email) {
      setErrorMessage("Did you forget your email")
    } else if (!password) {
      setErrorMessage("Did you forget your password");
    }
    
    registerWithEmailAndPassword(name, email, password);
  };
  
  const handleError = errorMessage ? <ErrorBanner errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> : null;

  useEffect(() => {
    if (loading) return;
    if (user) history("/");
  }, [user, loading]);

  return (
    <div className={`Register ${lightDark}`}>
      <Navbar />
      {handleError}
      <div className="Register-Container">
        <div className="Register-Main">
        <h1>Register</h1>
          <input
            type="text"
            className="Register-Text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="Register-Text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="Register-Text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="Register-Btn" onClick={register}>
            Register
          </button>
          <button
            className="Register-Btn Register-Google"
            onClick={signInWithGoogle}
          >
            Register with Google
          </button>
          <div>
            Already have an account? <Link className="Form-Forgot" to="/login">Login</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;