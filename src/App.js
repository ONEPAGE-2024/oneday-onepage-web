import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Diary from "./pages/Diary";
import Create from "./pages/Create";
import { useState } from "react";
import Edit from "./pages/Edit";

function App() {
  const [diaries, setDiaries] = useState([]);

  const addDiary = (newDiary) => {
    setDiaries([...diaries, newDiary]);
  };

  const deleteDiary = (id) => {
    setDiaries(diaries.filter((diary) => diary.id !== id));
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Diary diaries={diaries} deleteDiary={deleteDiary} />}
        />
        <Route path="/create" element={<Create addDiary={addDiary} />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
