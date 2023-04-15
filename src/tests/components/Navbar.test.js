import '@testing-library/jest-dom';
import { getAllByRole, render, screen, waitFor} from '@testing-library/react'
import * as setupTest from "../setupTests"
import Navbar from '../../components/Navbar';
import userEvent from '@testing-library/user-event';
import { UserContext } from '../../context/UserContext';
import { MemoryRouter } from 'react-router-dom';
import { LightDarkContext } from '../../context/LightDarkContext';
import { useContext } from 'react';


let before = true 

const mockUser = "Bill"
const mockLightDark = "dark"


beforeEach(() => {
    return setupTest.setUp(<Navbar/>);
})

afterEach(() => {
    before = true
})

describe("test navbar", () => {
    test("make sure it renders", () => {
        const title = screen.getByText("Where's Waldo?")
        const home = screen.getByRole("link", {name: "Home"})
        const login = screen.getByRole("link", {name: "Login"});

        expect(title).toBeInTheDocument();
        expect(home).toBeInTheDocument();
        expect(login).toBeInTheDocument();
    })
    test("check links with user and the routing of the link that renders with a user", () => {
        before = false 

        setupTest.renderWithContext(<Navbar/>, mockUser, mockLightDark);
        let logout;
        // you have to wait for the user to be set
        waitFor(() => {
            logout = screen.getByRole("link", {name: "Logout"})
            expect(logout).toBeInTheDocument();
        })
    })
    test("check that the links go to where they should", () => {
        const links = screen.getAllByRole("link");

        links.find(btn => {
            if (btn.textContent === "Home") {
                userEvent.click(btn)
                waitFor(() => expect(window.location.pathname).toBe("/"))
            } else if (btn.textContent === "Login") {
                userEvent.click(btn)
                waitFor(() => expect(window.location.pathname).toBe("/login"))
            }
        })
    })
    test("checks that the links go where they should with a user", () => {
        before = false 
        setupTest.renderWithContext(<Navbar/>, mockUser, mockLightDark);

        let link;
        waitFor(() => {
            link = screen.getByRole("link", {name: "Logout"});
            userEvent.click(link)
            waitFor(() => expect(window.location.pathname).toBe("/logout"));
        })
    })
    test("checks that lightDark button changes lightDark context", () => {
        before = false 

        setupTest.renderWithContext(<Navbar/>, mockUser, mockLightDark);

        const nav = screen.getByTestId("nav");
        const button = screen.getByTestId("lightDark-btn")
        userEvent.click(button)

        expect(nav).toHaveClass("Navbar light");
    })
})

// userEvent.click(logout)
// waitFor(() => expect(window.location.pathname).toBe())