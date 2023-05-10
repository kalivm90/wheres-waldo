import { useState, useEffect, useContext } from "react";
import { LightDarkContext } from "../context/LightDarkContext";
import Links from "./Navbar-Links";

import light from "../assets/images/light.svg"
import dark from "../assets/images/dark.svg"
import "../assets/styles/components/Navbar.css"

const Navbar = () => {
    const {lightDark, setLightDark} = useContext(LightDarkContext);
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

    return (
        <nav className={`Navbar ${lightDark}`} data-testid="nav">
            <h1>Where's Waldo?</h1>
            <Links/>
            <div className="lightDark-container">
                <button data-testid="lightDark-btn" onClick={handleClick}>
                    <img src={(lightDark === "light" ? light : dark)} alt="light dark icon"></img>
                </button>
            </div>
        </nav>
    )
}

export default Navbar