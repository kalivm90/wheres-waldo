// react
import { useContext, useEffect, useRef, useState, useTransition } from "react"
// components
import Clock from "../components/Clock"
import Overlay from "../components/Overlay"
// style
import "../assets/styles/pages/Game.css"
// images
import mario from "../assets/images/mario1.png"
import waldo from "../assets/images/waldo.png"
import luigi from "../assets/images/luigi.png"
import board from "../assets/images/img.jpg"
// context
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const Game = () => {

    const boardRef = useRef(null);

    const {username, setUsername} = useContext(UserContext)

    const [showOverlay, setShowOverlay] = useState(false);
    const [clickCoords, setClickCoords] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [clockTime, setClockTime] = useState(null);
    const [stopClock, setStopClock] = useState(false);

    const navigate = useNavigate()

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

    useEffect(() => {
        console.log("HERE 1")
        if (username === "guest") {
            console.log("HERE 2")
            sessionStorage.setItem("guest", username)
        } else if (!username) {
            const stored = sessionStorage.getItem("guest")
            if (stored === "guest") {
                setUsername("guest")
            }
            console.log("HERE 3")
        } else {
            navigate("/error");
        }

    }, [username])

    return (
        <div className="Game-Container">
            <Clock 
                setClockTime={setClockTime} 
                stopClock={stopClock}
            />
            {showOverlay && (
                <Overlay 
                    clickCoords={clickCoords} 
                    boardRef={boardRef} 
                    selectedCharacter={selectedCharacter} 
                    characters={characters} 
                    clockTime={clockTime}
                    stopClock={setStopClock}
                    />
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

export default Game