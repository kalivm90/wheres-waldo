// router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// context
import { LightDarkProvider } from "./context/LightDarkContext";
import { UserProvider } from "./context/UserContext";
// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Home from "./pages/index";
import Game from "./pages/Game";
import Error from "./pages/Error";
// styles
import "./App.css";

function App() {
  return (
      <UserProvider>
        <LightDarkProvider>
          <Router>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/reset" element={<Reset />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/game" element={<Game />} />
              <Route exact path="/error" element={<Error />} />
            </Routes>
          </Router>
        </LightDarkProvider>
      </UserProvider>
  );
}
export default App;
