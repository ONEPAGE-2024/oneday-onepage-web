import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Diary from "./pages/Diary";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import "./App.css";
import DiaryDetail from "./pages/DiaryDetail";

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
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Diary diaries={diaries} deleteDiary={deleteDiary} />}
          />
          <Route path="/create" element={<Create addDiary={addDiary} />} />
          <Route
            path="/edit/:id"
            element={<Edit diaries={diaries} updateDiary={updateDiary} />}
          />
          <Route path="/diary/:id" element={<DiaryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
