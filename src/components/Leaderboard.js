// react
import { useEffect, useState } from "react"
// styles
import "../assets/styles/components/Leaderboard.css"
// db
import WaldoDB from "../database/db";

const Leaderboard = () => {

    const [leaderboardData, setLeaderboardData] = useState([]);
    const db = WaldoDB();

    const sortLeaderboard = () => {
        if (!leaderboardData[1]) {
          return (
            <tr>
                <td>1</td> 
                <td>{leaderboardData.name}</td>
                <td>{leaderboardData.time}</td>
            </tr>
          )
        } else {
          const sortedTimes = leaderboardData.sort((a, b) => {
            return a.time.localeCompare(b.time);
          });
    
          let rank = 1;
          let prevTime = null;
          const rankedTimes = sortedTimes.map((time, index) => {
            if (prevTime !== null && time.time !== prevTime) {
              rank += 1;
            }
            prevTime = time.time;
            return ( 
                <tr>
                    <td>{rank}</td>
                    <td>{time.name}</td> 
                    <td>{time.time}</td>
                </tr>
             )
          })
          return rankedTimes
        }
      } 

    const getLeaderBoard = async() => {
        const q = await db.getCollection("leaderboard") // {field: "name", operator: "==", value: "Dylan Campbell"}
        if (q) {
            if (typeof(q) === "object") {
                setLeaderboardData(q)
            }
        }
    }

    useEffect(() => {
        getLeaderBoard();
        console.log(leaderboardData.length);
    }, [])

    return (
        <div className="Leaderboard-Container">
            <h2>Leaderboard</h2>
            {leaderboardData?.length > 0 ? (
                <div className="Leaderboard" data-testid="leaderboard-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortLeaderboard()}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="Leaderboard">
                    <h4>Nothing to display at this time.</h4>
                </div>
            )}
        </div>
    )
}

export default Leaderboard