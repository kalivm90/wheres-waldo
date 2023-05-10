import * as setupTest from "../setupTests.js"
import Navbar from "../../components/Navbar.js"
import { BrowserRouter, Link, MemoryRouter } from "react-router-dom"
import { UserContext } from "../../context/UserContext.jsx"
import { LightDarkContext } from "../../context/LightDarkContext.jsx"
import { fireEvent, getByTestId, render, screen, waitFor} from '@testing-library/react'
import Links from "../../components/Navbar-Links.js";
import renderer from 'react-test-renderer';
import userEvent from "@testing-library/user-event";

let component;

describe("test navbar", () => {

    const mockUser = "testUser";
    const mockLight = "light";

    test("make sure page elements render", () => {
        component = setupTest.setUp({component: <Navbar/>})

        const title = setupTest.screen.getByRole("heading", {name: "Where's Waldo?"})
        const home = setupTest.screen.getByRole("link", {name: "Home"})
        const login = setupTest.screen.getByRole("link", {"name": "Login"})

        expect(title).toBeInTheDocument();
        expect(home).toBeInTheDocument();
        expect(login).toBeInTheDocument();
    })
    test("renders logout link when user is present", () => {
        // navbar uses <Link> from react-router-dom so it needs to be called with BrowserRouter
        const navbar = setupTest.renderWithContext({component: <Navbar/>}, mockUser, mockLight);
        render(
            <BrowserRouter>
                {navbar.component}
            </BrowserRouter>
        )
        // making sure it renders properly 
        const title = setupTest.screen.getByText("Where's Waldo?")
        expect(title).toBeInTheDocument();

        // check for logout link
        const logout = setupTest.screen.getByText("Logout");
        expect(logout).toBeInTheDocument()
    })
    test("clicking Logout displays Login link", async () => {
        // render the Links component with a logged in user
        const setUsernameMock = jest.fn();
        let links = setupTest.renderWithContext(
          { component: <Links /> },
          mockUser,
          mockLight
        );
        render(
          <BrowserRouter>
            {links.component}
          </BrowserRouter>
        );
      
        // verify that the Logout link is present and clickable
        const logout = setupTest.screen.getByText("Logout");
        expect(logout).toBeInTheDocument();
        expect(logout).toBeEnabled();
      
        // simulate clicking the Logout link
        fireEvent.click(logout);

        waitFor(() => {
            expect(window.location.pathname).toBe("/");
            expect(setUsernameMock).toBeCalled();
        })
      });
    test("renders login link when no user is logged in", () => {
        const links = setupTest.renderWithContext(
            { component: <Links /> },
            null,
            mockLight
        );

        render (
            <BrowserRouter>
                {links.component}
            </BrowserRouter>
        )

        const login = setupTest.screen.getByText("Login");
        expect(login).toBeInTheDocument()
    })
    // this test does not pass and I have no idea why and I give up
    test("changes page styling when lightDark button is pressed", () => {

       render (
        <BrowserRouter>
            <LightDarkContext.Provider value={{lightDark: "dark", setLightDark: jest.fn()}}>
                <UserContext.Provider value={{username: "Bob", setUsername: jest.fn()}}>
                    <Navbar/>
                </UserContext.Provider>
            </LightDarkContext.Provider>
        </BrowserRouter>
        ); 

        const nav = setupTest.screen.getByTestId("nav")
        expect(nav).toBeInTheDocument();
        expect(nav).toHaveClass("Navbar dark")
        
        const button = setupTest.screen.getByTestId("lightDark-btn");
        expect(button).toBeInTheDocument();
        console.log(nav.className)
    
        userEvent.click(button)
        expect(nav).toHaveClass("Navbar light")


    })
})  
