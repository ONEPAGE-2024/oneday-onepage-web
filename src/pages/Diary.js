import Header from "../components/Header";
import "../styles/Diary.css";
<<<<<<< Updated upstream
import { useNavigate } from "react-router-dom";
=======
import { deletePost, fetchPosts } from "../api";
>>>>>>> Stashed changes

const Diary = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <Header title="내 일기 목록" />
        <button className="createBtn" onClick={() => navigate("/create")}>
          일기 추가
        </button>
      </div>
    </>
  );
};

export default Diary;
