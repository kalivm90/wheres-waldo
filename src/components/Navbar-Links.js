import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { logout } from "../util/firebase";

const Links = ({active}) => {
    const {username, setUsername} = useContext(UserContext)

    const logoutUser = () => {
        setUsername("");
        logout();
    }

    return (
        <div className="Links">
            <div className={`Link ${active === "Home" ? "active" : ""}`}>
                <Link to="/"><p>Home</p></Link>
            </div>
            {!username || username === "guest" ? (
                <div className={`Link ${active === "Login" ? "active" : ""}`}>
                    <Link to="/login"><p>Login</p></Link>
                </div>
            )
            : ( 
                <div className={`Link ${active === "Login" ? "active" : ""}`}>
                    <Link to="/"><p onClick={logoutUser}>Logout</p></Link>
                </div>
            )}
        </div>
    )
}

export default Links 