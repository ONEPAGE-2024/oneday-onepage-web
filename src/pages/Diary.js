import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Diary.css";
import { deletePost, fetchPosts } from "../api";

const Diary = ({ diaries, deleteDiary }) => {
  const BASE_URL = "http://3.38.61.26";
  const navigate = useNavigate();
  const [diariesList, setDiariesList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetchPosts();
      setDiariesList(response.data);
    } catch (error) {
      console.error("일기를 불러오는 데 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deletePost(id);
        deleteDiary(id);
        navigate("/");
      } catch (error) {
        console.error("일기를 삭제하는 데 오류가 발생했습니다:", error);
      }
    }
  };

  const handleDiaryDetail = (id) => {
    navigate(`/diary/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const getEmoticon = (emotion) => {
    switch (emotion) {
      case "happy":
        return "😊";
      case "sad":
        return "😢";
      case "angry":
        return "😡";
      case "notbad":
        return "🙁";
      case "good":
        return "🙂";
      default:
        return "";
    }
  };

  const formatDateString = (dateString) => {
    return dateString.slice(0, 10);
  };

  return (
    <div className="container">
      <Header title="내 일기 목록" />
      <button className="createBtn" onClick={() => navigate("/create")}>
        일기 추가
      </button>
      <div className="diaryList">
        {diariesList.length > 0 ? (
          diariesList.map((diary, idx) => (
            <div
              key={idx}
              className="diaryItem"
              onClick={() => handleDiaryDetail(diary.id)}
            >
              <div className="emoticon">{getEmoticon(diary.emotion)}</div>
              <div className="diaryContent">
                <strong>{diary.content}</strong>
                <p className="hashtag">{diary.hashtag.join(" ")}</p>
                <p className="date">{formatDateString(diary.regDate)}</p>
              </div>
              <div className="diaryActions">
                <button onClick={() => handleDelete(diary.id)}>삭제</button>
              </div>
            </div>
          ))
        ) : (
          <p>일기가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Diary;
