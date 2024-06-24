import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Diary.css";
import { deletePost, fetchPost, fetchPosts } from "../api";
import axios from "axios";

const Diary = ({ deleteDiary }) => {
  const BASE_URL = "http://10.80.162.25:8080";
  const navigate = useNavigate();
  const [diaries, setDiaries] = useState([]);

  const fetchData = async () => {
    await axios
      .get(`${BASE_URL}/diary/list`)
      .then((res) => setDiaries([res.data]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const password = prompt("비밀번호를 입력하세요:");
        if (password) {
          await deletePost(id, password);
          deleteDiary(id);
        }
      } catch (error) {
        console.error("일기를 삭제하는데 오류가 발생했습니다:", error);
      }
    }
  };

  return (
    <div className="container">
      <Header title="내 일기 목록" />
      <button className="createBtn" onClick={() => navigate("/create")}>
        일기 추가
      </button>
      <div className="diaryList">
        {diaries !== undefined &&
          diaries !== null &&
          diaries.length > 0 &&
          diaries.map((diary, idx) => (
            <div key={idx} className="diaryItem">
              <div className="diaryContent">
                <p>{diary.content}</p>
                <p>
                  <strong>날짜:</strong> {diary.regDate}
                </p>
                <p>
                  <strong>기분:</strong> {diary.emotion}
                </p>
                <p>
                  <strong>해시태그:</strong> {diary.hashtag}
                </p>
              </div>
              <div className="diaryActions">
                <button onClick={() => navigate(`/edit/${diary.id}`)}>
                  수정
                </button>
                <button onClick={() => handleDelete(diary.id)}>삭제</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Diary;
