import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Home from "./pages/index";
import { LightDarkProvider } from "./context/LightDarkContext";
import { UserProvider } from "./context/UserContext";

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
            </Routes>
          </Router>
        </LightDarkProvider>
      </UserProvider>
  );
}
export default App;