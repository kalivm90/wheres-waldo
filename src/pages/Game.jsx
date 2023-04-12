// react
import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
// style
import "../assets/styles/pages/Game.css"
// component 
import Clock from "../components/Clock";
import Overlay from "../components/Overlay";
// images
import board from "../assets/images/img.jpg"

import waldo from "../assets/images/waldo.png"
import luigi from "../assets/images/luigi.png"
import mario from "../assets/images/mario.png"

// context
import { UserContext } from "../context/UserContext"


import Board from "../components/Board.js"

const Game = () => {
  // const characters = [
  //   { name: "Mario", src: mario, id: "mario"},
  //   { name: "Luigi", src: luigi, id: "luigi"},
  //   { name: "Waldo", src: waldo, id: "waldo"}
  // ];
  
  // useEffect(() => {
  //   const board = document.getElementById("board");
  //   const boardRect = board.getBoundingClientRect();
    
  //   // Add each character to a randomly generated position on the board
  //   characters.forEach((character) => {
  //     const characterElement = document.createElement("img");
  //     characterElement.src = character.src;
  //     characterElement.className = "characters"
  //     characterElement.id = character.id

  //     const charRect = characterElement.getBoundingClientRect();

  //     const maxX = board.width - charRect.width;
  //     let maxY = board.height - charRect.height;

  //     let randomX = Math.floor(Math.random() * maxX);
  //     let randomY = Math.floor(Math.random() * maxY);
      
  //     randomY = (randomY < 300) ? randomY + 300 : randomY;

  //     characterElement.style.position = "absolute";
  //     characterElement.style.left = `${randomX}px`;
  //     characterElement.style.top = `${randomY}px`;

  //     // characterElement.style.left = `100px`;
  //     // characterElement.style.top = `100px`;

  //     characterElement.addEventListener("click", () => {
  //       alert(`You found ${character.name}!`);
  //     });

  //     document.querySelector(".Game-Container").appendChild(characterElement)
  //   });
  // }, []);

  return (
      <div className="Game">
        <Board />
        {/* <div id="container" className="Game-Container">
          <Clock />
          <img id="board" src={board}/>
          <div id="feedback"></div>
      </div> */}
    </div>
  )
}

// const Game = () => {
//   const { username } = useContext(UserContext)

//   const [imagesLoad, setImagesLoad] = useState(false);
//   const [showWindow, setShowWindow] = useState(false);

//   const [clickCoords, setClickCoords] = useState([]);

//   const px = useRef(0);
//   const py = useRef(0)

//   // I pass down this reference of board to Overlay
//   const boardRef = useRef(null);

//   const location = useNavigate();

//   const handleCharacterClick = () => {
//     console.log("found!")
//   }

//   const handleClick = (e) => {
//       const board = document.getElementById("board");
//       const waldo = document.getElementById("waldo");
  
//       const boardRect = board.getBoundingClientRect();
//       const waldoRect = waldo.getBoundingClientRect();
  
//       const clickX = e.clientX - boardRect.left - board.clientLeft;
//       const clickY = e.clientY - boardRect.top - board.clientTop;
  
//       setClickCoords([clickX, clickY]);
//       showWindow ? setShowWindow(false) : setShowWindow(true);
  
//       if ((clickX > px.current && clickX < px.current + waldoRect.width) && (clickY > py.current && clickY < py.current + waldoRect.height)) {
//         console.log("found");
//       }
//   }

//   useEffect(() => {
//     if (imagesLoad) {
//       const board = document.getElementById("board");
//       const waldo = document.getElementById("waldo");
  
//       const maxX = board.width - waldo.width;
//       let maxY = board.height - waldo.height;
  
//       let randomX = Math.floor(Math.random() * maxX);
//       let randomY = Math.floor(Math.random() * maxY);
      
//       randomY = (randomY < 300) ? randomY + 300 : randomY;

//       px.current = randomX
//       py.current = randomY
  
  
//       waldo.style.left = `${randomX}px`;
//       waldo.style.top = `${randomY}px`;
//     }
//   }, [imagesLoad]);

//   return (
//     <div className="Game">
//       <div id="container" className="Game-Container">
//         <Clock />
//         {/* {showWindow ? <Overlay clickCoords={clickCoords} boardRef={boardRef}/> : null} */}
//         <img id="board" ref={boardRef} src={board} alt="board" onLoad={() => setImagesLoad(true)} onClick={handleClick} />
//         <img id="luigi" className="characters" alt="luigi" src={luigi}></img>
//         <img
//           id="waldo"
//           src={waldo}
//           alt="waldo"
//           className="characters"
//           onLoad={() => setImagesLoad(true)}
//           onClick={handleCharacterClick}
//           style={{
//             position: "absolute",
//             pointerEvents: "none"
//           }}
//         />
//         <div id="feedback"></div>
//       </div>
//     </div>
//   );
// };

export default Game;



