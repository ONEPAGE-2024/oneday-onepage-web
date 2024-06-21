import Header from "../components/Header";
import "./Diary.css";
import { useNavigate } from "react-router-dom";

const Diary = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <Header title="2024년 6월" />
        <button className="createBtn" onClick={() => navigate("/create")}>
          일기 추가
        </button>
      </div>
    </>
  );
};

export default Diary;
