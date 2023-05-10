// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render, screen, waitFor, act} from '@testing-library/react'
// contexts 
import { UserContext, UserProvider } from '../context/UserContext';
import { LightDarkProvider, LightDarkContext } from '../context/LightDarkContext';
import { CharacterContext, CharacterProvider} from '../context/CharacterContext';
import { MemoryRouter } from 'react-router-dom';

function TestWrapper({children}) {
    return (
        <UserProvider>
            <LightDarkProvider>
                <CharacterProvider>
                    {children}
                </CharacterProvider>
            </LightDarkProvider>
        </UserProvider>
    )
}

function setUp({component}, initalEntries="/") {
    return render(
        <TestWrapper>
            <MemoryRouter initialEntries={[initalEntries]}>{component}</MemoryRouter>
        </TestWrapper>
    )
}

const renderWithContext = ({component}, user, lightDark, alreadySelectedChars=null, initalEntries="/") => {
    console.log(lightDark)
    return render (
        <UserContext.Provider value={{username: user, setUsername: jest.fn()}}>
            <LightDarkContext.Provider value={{lightDark: lightDark, setLightDark: jest.fn()}}>
                <CharacterContext.Provider value={{alreadySelectedChars: alreadySelectedChars}}>
                    <MemoryRouter initialEntries={[initalEntries]}>
                        {component}
                    </MemoryRouter>
                </CharacterContext.Provider>
            </LightDarkContext.Provider>
        </UserContext.Provider>
    )
}


export {
    setUp, 
    TestWrapper, 
    renderWithContext, 
    render, 
    screen,
    waitFor,
    act
}