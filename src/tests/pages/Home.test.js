import '@testing-library/jest-dom';
import { render, screen, waitFor} from '@testing-library/react'
import * as setupTest from "../setupTests"
import Home from "../../pages"
import userEvent from '@testing-library/user-event';

let basic = true;

const mockUser = "Bob"
const mockLightDark = "dark"


beforeEach(() => {
    if (basic) {
        setupTest.setUp(<Home/>);
    }
})

afterEach(() => {
    basic = true
})

describe("test home page", () => {
    test("make sure it renders", () => {
        const navHead = screen.getByText("Where's Waldo?")
        const waldo = screen.getByRole("img", {name: "waldo"})
        const contentHead = screen.getByText("How to Play")
      
        expect(contentHead).toBeInTheDocument()
        expect(navHead).toBeInTheDocument()
        expect(waldo).toBeInTheDocument()
    })

    test("test with user", () => {
        basic = false 

        setupTest.renderWithContext(<Home/>, mockUser, mockLightDark)

        waitFor(() => {
            const head = screen.getByText(`Welcome, ${mockUser}`);
            const table = screen.getByText("Leaderboard")
    
            expect(head).toBeInTheDocument();
            expect(table).toBeInTheDocument();
        })
    })

    test("without user", () => {
        const head = screen.getByRole("heading", {name: "How to Play"});
        const waldo = screen.getByRole("img", {name: "waldo"});

        expect(head).toBeInTheDocument();
        expect(waldo).toBeInTheDocument();
    })

    test("test redirects", () => {
        const buttons = screen.getAllByRole("button")
        buttons.find(btn => {
            if (btn.textContent === "register") {
                userEvent.click();
                waitFor(() => expect(window.location.pathname)).toBe("/register")
            } else if (btn.textContent === "guest") {
                userEvent.click();
                waitFor(() => expect(window.location.pathname)).toBe("/");
            } else if (btn.textContent === "play") {
                userEvent.click();
                waitFor(() => expect(window.location.pathname)).toBe("/game");
            }
        })
    })
})