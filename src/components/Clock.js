// style
import { useEffect, useState } from "react"
import "../assets/styles/components/Clock.css"
import { Link } from "react-router-dom";

const Clock = ({setClockTime, stopClock}) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
          if(!stopClock) {
            setTime((prevTime) => prevTime + 1);
          }
        }, 1000);
    
        return () => clearInterval(timer);
      }, [stopClock]);
    
      const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
    
        const formattedHours = hours.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");
        
        const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
        
        setClockTime(formattedTime);

        return formattedTime;
      };

    return (
        <div className="Clock">
            <Link to="/">Home</Link>
            <p>{formatTime(time)}</p>
        </div>
    )
}

export default Clock;