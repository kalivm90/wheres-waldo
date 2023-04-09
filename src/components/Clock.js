// style
import { useEffect, useState } from "react"
import "../assets/styles/components/Clock.css"

const Clock = () => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);
    
      const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
    
        const formattedHours = hours.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");
    
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      };

    return (
        <div className="Clock">
            <p>{formatTime(time)}</p>
        </div>
    )
}

export default Clock;