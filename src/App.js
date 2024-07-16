import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Diary from "./pages/Diary";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import "./App.css";
import DiaryDetail from "./pages/DiaryDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/diary/:id" element={<DiaryDetail />} />
          <Route
            path="/"
            element={<Diary diaries={diaries} deleteDiary={deleteDiary} />}
          />
          <Route path="/create" element={<Create addDiary={addDiary} />} />
          <Route
            path="/edit/:id"
            element={<Edit diaries={diaries} updateDiary={updateDiary} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
