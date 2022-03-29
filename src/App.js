import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Mockman from "mockman-js";
import { Home } from "./pages";
import { Trending } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/mock" element={<Mockman />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
