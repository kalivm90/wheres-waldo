// react
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// style
import "../assets/styles/pages/Game.css"
// component 
import Clock from "../components/Clock";
// images
import board from "../assets/images/img.jpg"
import waldo from "../assets/images/waldo.png"
// context
import {UserContext} from "../context/UserContext"


const Game = () => {
    const {username} = useContext(UserContext)
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);

    const location = useNavigate();
  
    const __getRandomCoords = (referenceRect, targetRect) => {
      const paddingTop = 300;
  
      let randX = Math.floor(Math.random() * (referenceRect.width - targetRect.width));
      let randY = Math.floor(Math.random() * (referenceRect.height - targetRect.height));
  
      randY = (randY <= paddingTop) ? randY += paddingTop : randY;
  
      setPosX(randX);
      setPosY(randY);
    };
  
    useEffect(() => {
      const board = document.getElementById('board');
      const waldo = document.getElementById('waldo');
      const feedback = document.getElementById('feedback');
      
      if (!username) {
        location("/error")
        return null;
      }

      const handleBoardClick = (e) => {
        const boardRect = board.getBoundingClientRect();
        const waldoRect = waldo.getBoundingClientRect();
        const clickX = e.clientX - boardRect.left;
        const clickY = e.clientY - boardRect.top;
  
        if (clickX > posX && clickX < posX + waldoRect.width && clickY > posY && clickY < posY + waldoRect.height) {
          feedback.textContent = 'You found the character!';
          console.log("FOUND");
        } else {
          feedback.textContent = 'Try again.';
        }
      };
  
      const handleWaldoLoad = () => {
        const boardRect = board.getBoundingClientRect();
        const waldoRect = waldo.getBoundingClientRect();
        __getRandomCoords(boardRect, waldoRect);
      };
  
      waldo.addEventListener('load', handleWaldoLoad);
      board.addEventListener('click', handleBoardClick);
  
      return () => {
        waldo.removeEventListener('load', handleWaldoLoad);
        board.removeEventListener('click', handleBoardClick);
      };
    }, [posX, posY]);
  
    return (
        <div className="Game">
            <div id="container" className="Game-Container">
              <Clock />
              <img id="board" src={board} alt="board" />
              <img
                id="waldo"
                src={waldo}
                alt="waldo"
                onLoad={() => console.log('waldo loaded')}
                style={{
                  position: 'absolute',
                  top: `${posY}px`,
                  left: `${posX}px`,
                  pointerEvents: 'none',
                }}
              />
              <div id="feedback"></div>
            </div>
        </div>
      );
      
    
  };
  
  export default Game;
  

