/* 
    TODO, 
    form validation for register. Login i think is done. 
    add more characters to game with a dropdown menu to pick who it is
    db support
    error page
*/

// react
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// auth
import {auth, db, logout} from "../util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// db
import { query, collection, getDocs, where } from "firebase/firestore";
// context
import { UserContext } from "../context/UserContext";
import { LightDarkContext } from "../context/LightDarkContext";
// images
import waldo from "../assets/images/waldo.png"
// css
import "../assets/styles/pages/index.css"
// component 
import Navbar from "../components/Navbar";
// helper 
import toTitleCase from "../util/helpers";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const {lightDark} = useContext(LightDarkContext);
  const {username, setUsername} = useContext(UserContext)
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setUsername(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);


  return (
    <div className={`Home ${lightDark}`}>
        <Navbar />
        <div className="Home-Main">
          {!username ? (
            <header>
              <div className="Home-Info">
                <h1>How to Play</h1>
                <div className="Info-Wrapper">
                    <div className="Info-Summary">
                        <p>You're about to embark on a journey to find Waldo, a well-known character in a sea of busy scenes. Your task is simple: spot Waldo as quickly as possible! But don't be fooled - finding him won't be as easy as you might think.</p>
                        <p>In each scene, Waldo is hidden among a variety of other objects and characters, each with their own unique colors and patterns. You'll need to keep a sharp eye out for him, as well as other characters like Wenda, Wizard Whitebeard, and Woof, who are also hiding in each scene.</p>
                        <p>But time is of the essence - you'll need to find all the characters before the clock runs out! Keep an eye on the timer in the corner of the screen as you search for Waldo and his friends.</p>
                        <p>Once you've found all the characters, you can submit your time to our leaderboard and see how you stack up against other players. Will you be the fastest to find Waldo and his friends in every scene?</p>
                    </div>
                  <div className="Info-Login">
                      <img src={waldo} alt="waldo"></img>
                      <div className="Login-Wrapper">
                          <h2>Login in or continue as guest.</h2>
                          <p>If you proceed as a guest you will not be able to post to the leaderboard</p>
                        <div>
                            <Link to="/register"><button>Register</button></Link> 
                            <Link to="/"><button onClick={() => setUsername("guest")}>Guest</button></Link>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </header> )
          : (
            <div className="Home-Game">
              <h1>Welcome, {toTitleCase(username)}</h1>
              <header>
                {/* <div>{user?.email}</div> */}
                <div className="Choose-Level">
                  <h2>Choose your difficulty</h2>
                  <div className="Levels">
                      <Link to="/game"><button>Play</button></Link>
                  </div>
                </div>
              </header>
            </div>
          )}
       </div>
     </div>
  );
}
export default Home;
