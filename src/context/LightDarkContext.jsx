import { useState, createContext, useMemo, useEffect } from 'react';

const LightDarkContext = createContext(); 

const LightDarkProvider = (props) => {
    const [lightDark, setLightDark] = useState("light");


    useEffect(() => {
        // check local storage
        const localLightDark = JSON.parse(localStorage.getItem("lightDark"));

        (localLightDark) ? setLightDark(localLightDark) : setLightDark("light");

    }, []);


    const value = useMemo(
        () => ({ 
            lightDark,
            setLightDark,
        }),
        [lightDark]
    );

    return (
        <LightDarkContext.Provider value={value}>
            {props.children}
        </LightDarkContext.Provider>
    );
}

export { LightDarkContext, LightDarkProvider };
