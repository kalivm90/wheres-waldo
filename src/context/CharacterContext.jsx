import { useState, createContext, useMemo, useEffect } from 'react';

const CharacterContext = createContext(); 

const CharacterProvider = (props) => {
    const [alreadySelectedChars, setAlreadySelectedChars] = useState([]);

    const value = useMemo(
        () => ({ 
            alreadySelectedChars,
            setAlreadySelectedChars,
        }),
        [alreadySelectedChars]
    );

    return (
        <CharacterContext.Provider value={value}>
            {props.children}
        </CharacterContext.Provider>
    );
}

export { CharacterContext, CharacterProvider };
