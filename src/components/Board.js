import { useRef, useState } from "react"

import Clock from "./Clock"
import Overlay from "./Overlay"

import "../assets/styles/components/Board.css"

import mario from "../assets/images/mario1.png"
import waldo from "../assets/images/waldo.png"
import luigi from "../assets/images/luigi.png"
import board from "../assets/images/img.jpg"

const Board = () => {

    const boardRef = useRef(null);

    const [showOverlay, setShowOverlay] = useState(false);
    const [clickCoords, setClickCoords] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const characters = [
        { name: "Mario", src: mario, id: "mario"},
        { name: "Luigi", src: luigi, id: "luigi"},
        { name: "Waldo", src: waldo, id: "waldo"}
    ];

    const handleClick = (e) => {
        const boardRect = boardRef.current.getBoundingClientRect()

        const clickX = e.clientX - boardRect.left - boardRef.current.clientLeft;
        const clickY = e.clientY - boardRect.top - boardRef.current.clientTop;

        const images = document.querySelectorAll(".characters");

        images.forEach(i => {
             const rect = i.getBoundingClientRect();

             const yCoord = parseFloat(i.style.top)
             const xCoord = parseFloat(i.style.left)

             if ((clickX > xCoord && clickX < xCoord + rect.width) && (clickY > yCoord && clickY < yCoord + rect.height)) {
                setSelectedCharacter(i);
                console.log("found");
             } else {
                console.log("no");
             }
        });

        setClickCoords([clickX, clickY]);
        (showOverlay) ? setShowOverlay(false) : setShowOverlay(true);
    }

    const loadImages = (e) => {
        const rect = e.target.getBoundingClientRect();

        const maxX = boardRef.current.width - rect.width;
        const maxY = boardRef.current.height - rect.height;

        console.log(maxX, maxY)

        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);
        
        randomY = (randomY < 300) ? randomY + 300 : randomY;

        e.target.style.top = `${randomY}px`
        e.target.style.left = `${randomX}px`

    }

    const handleImages = () => {
        return characters.map((i, index) => {
            return (
                <img 
                    src={i.src} 
                    name={i.name} 
                    id={i.id} 
                    index={index} 
                    onLoad={loadImages} 
                    className="characters">
                </img>
            )
        })
    }

    return (
        <div className="Board-Container">
            <Clock />
            {showOverlay && (
                <Overlay clickCoords={clickCoords} boardRef={boardRef} selectedCharacter={selectedCharacter} characters={characters}/>
            )}
            <img 
                id="board" 
                ref={boardRef} 
                src={board} 
                alt="board"
                onClick={handleClick}
            ></img>
            {handleImages()}
        </div>
    )
}

export default Board