// react/context
import { useContext, useEffect, useState } from "react"
import { LightDarkContext } from "../context/LightDarkContext"
// styles/images
import "../assets/styles/components/ErrorBanner.css"
// helper 
import toTitleCase from "../util/helpers"

const ErrorBanner = ({errorMessage, setErrorMessage}) => {
    const {lightDark} = useContext(LightDarkContext)
    const [show, setShow] = useState(true)

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setShow(false)
                setErrorMessage("")
                console.log("FIRE");
            }, 3000)
        }
    }, [])

    return (
        <div className={`ErrorBanner ${lightDark}`}>
            <p>{toTitleCase(errorMessage)}?</p>
        </div>
    )
}


export default ErrorBanner