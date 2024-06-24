import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./Edit.css";

const Edit = ({ updateDiary }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryDetail = async () => {
      try {
        const response = await axios.get(`http://3.38.61.26/diary/${id}`, {
          timeout: 10000,
        });
        setDiary(response.data);
        setLoading(false);
      } catch (error) {
        console.error("일기 내용을 가져오는 중 오류가 발생했습니다:", error);
        setLoading(false);
      }
    };

    fetchDiaryDetail();
  }, [id]);

  const handleUpdate = async (updatedContent) => {
    const retries = 3; // 최대 3번까지 재시도
    let retryCount = 0;

    while (retryCount < retries) {
      try {
        const updatedDiary = { ...diary, content: updatedContent };
        await axios.put(`http://3.38.61.26/diary/update/${id}`, updatedDiary, {
          timeout: 30000,
          headers: {
            "Content-Type": "application/json",
          },
        });

        updateDiary(updatedDiary);
        navigate(`/diary/${id}`);
        return;
      } catch (error) {
        if (axios.isCancel(error) || error.code === "ECONNABORTED") {
          retryCount++;
          console.warn(`일기 수정 요청 ${retryCount}회 재시도 중...`);
        } else {
          console.error("일기 수정 중 오류가 발생했습니다:", error);
          break;
        }
      }
    }

    console.error("일기 수정 요청 실패: 재시도 횟수를 초과했습니다.");
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!diary) {
    return <div>일기를 찾을 수 없습니다.</div>;
  }

  const emotions = [
    { id: "happy", icon: "😊" },
    { id: "sad", icon: "😢" },
    { id: "angry", icon: "😡" },
    { id: "notbad", icon: "🙁" },
    { id: "good", icon: "🙂" },
  ];

  const hashtagOptions = [
    "#아무나랑",
    "#가족이랑",
    "#친구랑",
    "#나혼자",
    "#집",
    "#학교",
    "#회사",
    "#소풍",
    "#공부",
    "#운동",
    "#게임",
    "#여행",
    "#독서",
    "#호캉스",
    "#잠",
  ];

  const handleHashtagClick = (tag) => {
    const updatedHashtags =
      diary.hashtag && diary.hashtag.includes(tag)
        ? diary.hashtag.filter((t) => t !== tag)
        : [...(diary.hashtag || []), tag];
    setDiary({ ...diary, hashtag: updatedHashtags });
  };

  return (
    <div className="container">
      <Header title="일기 수정하기" />
      <div className="txtContainer">
        <div className="txtDiary">오늘의 일기</div>
        <textarea
          className="diaryContainer"
          value={diary.content}
          onChange={(e) => setDiary({ ...diary, content: e.target.value })}
          placeholder="오늘의 일기를 작성하세요"
        />
        <div className="txtEmotion">오늘의 기분</div>
        <div className="emotionButtons">
          {emotions.map((item) => (
            <button
              key={item.id}
              className={`emotionButton ${
                diary.emotion === item.id ? "selected" : ""
              }`}
              onClick={() => setDiary({ ...diary, emotion: item.id })}
            >
              {item.icon}
            </button>
          ))}
        </div>
        <div className="txtHashtag">오늘의 해시태그</div>
        <div className="hashtagButtons">
          {hashtagOptions.map((tag) => (
            <button
              key={tag}
              className={`hashtagButton ${
                diary.hashtag && diary.hashtag.includes(tag) ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <button
          className="registerBtn"
          onClick={() => handleUpdate(diary.content)}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default Edit;
