import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Mockman from "mockman-js";
import { Home, Trending, Login, Signup } from "./pages";
import { ToasterWrapper } from "./utils";
import { useAuth } from "./context/AuthContext";

function App() {
  const {
    state: { isLoggedIn },
  } = useAuth();
  return (
    <div className="App">
      <ToasterWrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        {!isLoggedIn && <Route path="/signup" element={<Signup />} />}
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        <Route path="/mock" element={<Mockman />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
