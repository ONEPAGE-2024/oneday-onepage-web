import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./DiaryDetail.css";

const DiaryDetail = () => {
  const { id } = useParams();
  const [diary, setDiary] = useState(null);
  console.log(id);

  const fetchDiaryDetail = async () => {
    try {
      const response = await axios.get(
        `http://10.80.162.25:8080/api/posts/${id}`
      );
      setDiary(response.data);
    } catch (error) {
      console.error("일기 내용을 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    fetchDiaryDetail();
  }, []);

  if (!diary) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="container">
      <Header title="일기 상세보기" />
      <div className="diaryDetailContainer">
        <div className="diaryDetailContent">
          <p>{diary.content}</p>
          <p>
            <strong>날짜:</strong>{" "}
            {new Date(diary.regDate).toLocaleDateString()}
          </p>
          <p>
            <strong>기분:</strong> {diary.emotion}
          </p>
          <p>
            <strong>해시태그:</strong> {diary.hashtag.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiaryDetail;
