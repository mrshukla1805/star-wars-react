import { Routes, Route } from "react-router-dom";
import "./App.css";
import Planets from "./components/Planets/Planets";
import People from "./components/People/People";
import HomePage from "./components/HomePage/HomePage";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="parent">
      <button onClick={() => setDarkMode(!darkMode)}>
         { darkMode ? <Sun /> : <Moon /> } 
      </button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/people/:planetId" element={<People />} />
      </Routes>
    </div>
  );
}

export default App;
