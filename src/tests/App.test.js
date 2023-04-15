import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from "../App"

import { UserProvider } from '../context/UserContext';
import { LightDarkProvider } from '../context/LightDarkContext';
import { CharacterProvider } from '../context/CharacterContext';



beforeEach(() => {
  render(
    <UserProvider>
      <LightDarkProvider>
        <CharacterProvider>
          <App />
        </CharacterProvider>
      </LightDarkProvider>
    </UserProvider>
  );
})


test('renders Home component', () => {
  const navHead = screen.getByText("Where's Waldo?")
  const waldo = screen.getByRole("img", {name: "waldo"})
  const contentHead = screen.getByText("How to Play")

  expect(contentHead).toBeInTheDocument()
  expect(navHead).toBeInTheDocument()
  expect(waldo).toBeInTheDocument()
});