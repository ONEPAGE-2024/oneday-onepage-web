import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./DiaryDetail.css";

const DiaryDetail = () => {
  const { id } = useParams();
  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiaryDetail = async () => {
      try {
        const response = await axios.get(`http://3.38.61.26/diary/${id}`);
        setDiary(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("일기 내용을 가져오는 중 오류가 발생했습니다:", error);
        setLoading(false);
      }
    };
    fetchDiaryDetail();
  }, [id]);

  const formatDate = (isoDateString) => {
    if (!isoDateString) return "날짜 정보 없음";
    const date = new Date(isoDateString);
    return date.toString() !== "Invalid Date"
      ? date.toLocaleDateString()
      : "날짜 형식 오류";
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

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!diary) {
    return <div>일기를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container">
      <Header title="일기 상세보기" />
      <div className="diaryDetailContainer">
        <div className="diaryDetailContent">
          <div className="info">
            <p className="date">
              <strong>날짜:</strong> {formatDate(diary.regDate)}
            </p>
            <p className="emotion">
              <strong>기분:</strong>{" "}
              {diary.emotion ? getEmoticon(diary.emotion) : "기분 정보 없음"}
            </p>
          </div>
          <strong className="content">{diary.content}</strong>
          <p className="hashtag">
            {diary.hashtag && diary.hashtag.length > 0
              ? diary.hashtag.join(" ")
              : "해시태그가 없습니다."}
          </p>
          <button className="editBtn" onClick={handleEdit}>
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiaryDetail;
