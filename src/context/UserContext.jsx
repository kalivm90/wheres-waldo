import { useState, createContext, useMemo, useEffect } from 'react';

const UserContext = createContext(); 

const UserProvider = (props) => {
    const [username, setUsername] = useState("")
    const [errorMessage, setErrorMessage] = useState("");

    const value = useMemo(
        () => ({ 
            username, 
            setUsername,
            errorMessage,
            setErrorMessage,
        }),
        [username, errorMessage]
    );

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };