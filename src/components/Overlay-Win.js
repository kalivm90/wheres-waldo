// react
import { useContext, useState } from "react";
// auth 
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../util/firebase";
// db 
import WaldoDB from "../database/db";
// style/images
import nice from "../assets/images/nice.gif"
import "../assets/styles/components/Overlay-Win.css"
// context
import { UserContext } from "../context/UserContext";


const Win = ({clockTime, stopClock}) => {
    const [user, loading, error] = useAuthState(auth);
    const [bestTime, setBestTime] = useState(0);
    const {errorMessage, setErrorMessage} = useContext(UserContext);
    const {username} = useContext(UserContext);

    const db = WaldoDB()

    const getBestTime = async() => {
        const time = await db.getCollection("leaderboard", {field: "uid", operator: "==", value: user?.uid})
        if (!time) {
          return null 
        }

        const timeString = time.time;
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
        
        return timeInSeconds
    }

    useState(() => {
        (async() => {
            const timeInSeconds = await getBestTime();
            setBestTime(timeInSeconds);
        })();
    }, [])

    const handleSubmit = async(e, time) => {
        stopClock(true)
  
        if (user) {
          const q = await db.getCollection("leaderboard", {field: "uid", operator: "==", value: user?.uid})
          if (q && q.id) {
            console.log("update")
            await db.updateDocument("leaderboard", q.id, clockTime);
          } else {
            console.log("ADD");
            await db.addDocument("leaderboard", {name: user.displayName, uid: user.uid, time: clockTime})
          }        
          e.target.remove();
        } else {
          setErrorMessage("Are you using a guest account")
        }
        // console.log(await db.get("users", [
        //   {field: "name", operator: "==", value: "Dylan Campbell"},
        //   {field: "email", operator: "==", value: "dylanericcam90@gmail.com"}
        // ]))
        console.log(time);
      }
  

    return (
        <div className="Win">
            {bestTime > clockTime || !bestTime ? (
                <div className="Win-Container">
                    <img id="nice" src={nice} alt="nice"></img>
                    <div className="Win-Btn">
                        <button className="Window-img" id="replay" onClick={() => window.location.reload()}>Replay</button> 
                        {user?.displayName ? (
                            <button className="Window-Img" id="submit-time" onClick={(e) => handleSubmit(e, clockTime)}>Submit Time</button> 
                        ): null}
                    </div>
                    {stopClock(true)}
                </div>
            ) : (
                <div className="Win-Container">
                    <p>You did not beat your best time of {bestTime} second/s</p>
                    <div className="Win-Btn">
                        <button className="Window-img" id="replay" onClick={() => window.location.reload()}>Replay</button>
                    </div>
                    {stopClock(true)}
                </div>
            )}
        </div>
    )
}

export default Win