import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Diary from "./pages/Diary";
import Create from "./pages/Create";

function App() {
  const [diaries, setDiaries] = useState([]);

  const addDiary = (newDiary) => {
    setDiaries([...diaries, newDiary]);
  };

  const updateDiary = (updatedDiary) => {
    setDiaries((prevDiaries) =>
      prevDiaries.map((diary) =>
        diary.id === updatedDiary.id ? updatedDiary : diary
      )
    );
  };

  const deleteDiary = (id) => {
    setDiaries((prevDiaries) => prevDiaries.filter((diary) => diary.id !== id));
  };

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
