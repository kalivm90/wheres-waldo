// react
import React, { useContext, useEffect, useRef, useState } from "react";
// context
import { CharacterContext } from "../context/CharacterContext";
import { UserContext } from "../context/UserContext";
// style/images
import "../assets/styles/components/Overlay.css"
import nice from "../assets/images/nice.gif"
// db
import WaldoDB from "../database/db";
// auth
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../util/firebase";
// components 
import ErrorBanner from "./ErrorBanner";
import Win from "./Overlay-Win";

/* 
    this component was a pain in the ass. I spent 3 days on this and in the end had to hard code the functionality.
    I may have looked over a better way to do this but just out of pure frustration settled on doing it the long way 
    so I could proceed with the course
*/
const Overlay = ({ clickCoords, boardRef, selectedCharacter, characters, clockTime, stopClock}) => {
    const db = WaldoDB();

    const boardRect = boardRef.current.getBoundingClientRect();
    
    // context
    const {alreadySelectedChars, setAlreadySelectedChars} = useContext(CharacterContext)
    const {errorMessage, setErrorMessage} = useContext(UserContext);
    // auth
    const [user, loading, error] = useAuthState(auth);

    const [bestTime, setBestTime] = useState(0);

    const overlayRef = useRef();
    const windowRef = useRef();
  
    const viewportTop = window.pageYOffset;
    const viewportLeft = window.pageXOffset;
    
    const overlayWidth = 150;
    const overlayHeight = 150;
    const windowWidth = 200;
    // const windowHeight = 200;
    const windowHeight = 250;
  
    const clickY = clickCoords[1] - boardRect.top - viewportTop
    const clickX = clickCoords[0] - boardRect.left - viewportLeft

    const [winTime, setWinTime] = useState("");
  
    let windowTop, windowLeft, overlayTop, overlayLeft;
  
  
  
    // bottom of screen
    if (clickY + overlayHeight / 2 >= boardRef.current.height) {
      // console.log("bottom")
      overlayTop = boardRef.current.height - overlayHeight
      overlayLeft = clickX - overlayWidth / 2
  
      // bottom left
      if (clickX - windowWidth <= 0) {
        // console.log("bottom left")
        windowTop = clickY - windowHeight
        windowLeft = clickX + overlayWidth / 2
      } else {
        windowLeft = clickX - overlayWidth / 2 - windowHeight
        windowTop = clickY - windowHeight - overlayHeight / 2
      }
    // top of screen 
    } else if (clickY - overlayHeight / 2 <= 0) {
      // console.log("top");
      overlayTop = 0;
      overlayLeft = clickX - overlayWidth / 2
      // top left corner
      if (clickX - windowHeight - overlayWidth / 2 <= 0) {
        // console.log("Top left")
        windowTop = clickY + overlayHeight / 5
        windowLeft = clickX + overlayWidth / 2
      } else {
        windowLeft = clickX - overlayWidth / 2 - windowHeight
        windowTop = clickY + overlayHeight / 5
      }
    // left
    } else if (clickX - overlayWidth <= 0) {
      overlayLeft = 0
      overlayTop = clickY - overlayWidth / 2
  
      if (clickY - windowHeight - overlayHeight <= 0) {
        // console.log("top left corner")
        windowTop = clickY + overlayHeight / 2 - 50
        windowLeft = clickX + overlayWidth / 2
      } else {
        windowTop = clickY - windowHeight
        windowLeft = overlayWidth 
      }
  
    // right
    } else if (clickX + overlayWidth / 2 >= boardRef.current.width) {
      // console.log("right");
      overlayLeft = boardRef.current.width - overlayWidth
      overlayTop = clickY - overlayWidth / 2
  
      // bottom right corner
      if (clickY + overlayHeight + windowHeight >= boardRef.current.height) {
        windowLeft = clickX - overlayWidth - windowWidth
        windowTop = clickY - windowHeight
        // console.log("bottom right")
      } else {
        windowLeft = clickX - overlayWidth - windowHeight
        windowTop = clickY
      }
    // middle
    } else {
      // console.log("middle")
      overlayTop = clickY - overlayHeight / 2 
      overlayLeft = clickX - overlayWidth / 2
  
      // mid top
      if (clickY - windowHeight - overlayHeight / 5 <= 0) {
        // console.log("mid top")
        windowLeft = clickX - overlayWidth / 2 - windowHeight
        windowTop = clickY + overlayHeight / 5
      } else {
        windowLeft = clickX - overlayWidth / 2 - windowHeight
        windowTop = clickY - windowHeight - overlayHeight / 5
      }
      // mid bottom
      if (clickX - overlayWidth / 2 - windowWidth <= 0) {
        // console.log("mid bottom")
        windowLeft = clickX + overlayWidth / 2
        windowTop = clickY - overlayWidth
      }
    }
    
    const shared = {
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 3,
    }

    const overlayStyle = {
        ...shared,
        left: clickCoords[0] - boardRect.left - viewportLeft - overlayWidth / 2,
        top: overlayTop,
        width: `${overlayWidth}px`,
        height: `${overlayHeight}px`,
        borderRadius: "50%",
        border: "7px dashed white"
      };
    
      const windowStyle = {
        ...shared,
        left: windowLeft,
        top: windowTop,
        width: `${windowWidth}px`,
        height: `${windowHeight}px`,
      }


    const handleClick = (e, character) => {
      if (character.name === selectedCharacter.name) {
        setAlreadySelectedChars([...alreadySelectedChars, selectedCharacter.name]);
      }
    }
    
    const handleError = (errorMessage) ? <ErrorBanner errorMessage={errorMessage} setErrorMessage={setErrorMessage}></ErrorBanner> : null;

    const handleSubmit = async(time) => {
      stopClock(true)

      if (user) {
        const q = await db.getCollection("leaderboard", {field: "uid", operator: "==", value: user?.uid})
        if (q && q.id) {
          await db.updateDocument("leaderboard", q.id, clockTime);
        } else {
          await db.addDocument("leaderboard", {name: user.displayName, uid: user.uid, time: clockTime})
        }        
      } else {
        setErrorMessage("Are you using a guest account")
      }
    }

    const getBestTime = async() => {
      const time = await db.getCollection("leaderboard", {field: "uid", operator: "==", value: user?.uid})
      if (time === null) {
        return null
      }
      const timeString = time.time;
      const [hours, minutes, seconds] = timeString.split(':').map(Number);
      const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
      
      return timeInSeconds
    }

    useEffect(() => {
      if (user) {
        (async() => {
          const timeInSeconds = await getBestTime();
          setBestTime(timeInSeconds);
        })(); 
      }
    }, []);

    return (
      <div data-testid="overlay">
        {handleError}
        <div id="Overlay" ref={overlayRef} style={overlayStyle}></div>
        <div className="Window" ref={windowRef} style={windowStyle}>
          {alreadySelectedChars?.length < 3 ? (
            characters.map(i => {
              if (!alreadySelectedChars.includes(i.name)) {
                return (
                  <button name={i.name} onClick={(e) => handleClick(e, i)}>
                    <img className="Window-Img" src={i.src}></img>
                    {i.name}
                  </button>
                )
              }
            })
          ) : <Win clockTime={clockTime} stopClock={stopClock}/> }
        </div>
      </div>
    )
  };

  export default Overlay
