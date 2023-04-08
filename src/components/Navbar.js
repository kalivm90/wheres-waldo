import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { LightDarkContext } from "../context/LightDarkContext";
import { logout } from "../util/firebase";
import { Link } from "react-router-dom";

import light from "../assets/images/light.svg"
import dark from "../assets/images/dark.svg"
import "../assets/styles/components/Navbar.css"

const Navbar = () => {
    const {lightDark, setLightDark} = useContext(LightDarkContext);
    const {username, setUsername} = useContext(UserContext)
    const [active, setActive] = useState("");

    useEffect(() => {
        if (window.location.pathname === "/") {
            setActive("Home")
        } else if (window.location.pathname === "/login")  {
            setActive("Login")
        }
    }, [active])

    const handleClick = () => {
        const newVal = (lightDark === "dark") ? "light" : "dark"
        setLightDark(newVal);
        localStorage.setItem("lightDark", JSON.stringify(newVal));
    }

    const logoutUser = () => {
        setUsername("");
        logout();
    }

    return (
        <nav className={`Navbar ${lightDark}`}>
            <h1>Where's Waldo?</h1>
            <div className="Links">
                    <div className={`Link ${active === "Home" ? "active" : ""}`}>
                        <Link to="/"><p>Home</p></Link>
                    </div>
                    {!username ? (
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
            <div className="lightDark-container">
                <button onClick={handleClick}><img src={(lightDark === "light" ? light : dark)} alt="light dark icon"></img></button>
            </div>
        </nav>
    )
}

export default Navbar