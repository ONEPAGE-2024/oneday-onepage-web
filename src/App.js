import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Diary from "./pages/Diary";
import Create from "./pages/Create";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Diary />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
