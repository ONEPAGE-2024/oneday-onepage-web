import "./Edit.css";
import Header from "../components/Header";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePost } from "../api";

const Edit = ({ diaries, updateDiary }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const diary = diaries.find((diary) => diary.id === parseInt(id));

  const [selectedDate, setSelectedDate] = useState(diary ? diary.regDate : "");
  const [hashtag, setHashtag] = useState(
    diary ? diary.hashtag.split(", ") : []
  );
  const [content, setContent] = useState(diary ? diary.content : "");
  const [selectedEmotion, setSelectedEmotion] = useState(
    diary ? diary.emotion : "happy"
  );

  const emotions = [
    { id: "happy", icon: "😊" },
    { id: "sad", icon: "😢" },
    { id: "angry", icon: "😡" },
    { id: "excited", icon: "🙁" },
    { id: "calm", icon: "🙂" },
  ];

  const handleEmotionClick = (emotionId) => {
    setSelectedEmotion(emotionId);
  };

  const handleUpdate = async () => {
    try {
      const updatedDiary = {
        emotion: selectedEmotion,
        hashtag: hashtag.join(", "),
        content: content,
        regDate: selectedDate,
      };
      await updatePost(id, updatedDiary);
      updateDiary({ id, ...updatedDiary });
      navigate("/");
    } catch (error) {
      console.error("일기를 수정하는데 오류가 생겼습니다:", error);
    }
  };

  const handleHashtagClick = (tag) => {
    const index = hashtag.indexOf(tag);
    if (index === -1) {
      setHashtag([...hashtag, tag]);
    } else {
      const updatedHashtag = [...hashtag];
      updatedHashtag.splice(index, 1);
      setHashtag(updatedHashtag);
    }
  };

  if (!diary) {
    return (
      <div className="container">
        <Header title="일기 수정" />
        <div className="loading">일기를 불러오는 중입니다...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header title="일기 수정" />
      <div className="txtContainer">
        <div className="txtWeather">날짜</div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="datePicker"
        />
        <div className="txtEmotion">오늘의 기분</div>
        <div className="emotionButtons">
          {emotions.map((item) => (
            <button
              key={item.id}
              className={`emotionButton ${
                selectedEmotion === item.id ? "selected" : ""
              }`}
              onClick={() => handleEmotionClick(item.id)}
            >
              {item.icon}
            </button>
          ))}
        </div>
        <div className="txtHashtag">오늘의 해시태그</div>
        <div className="hashtagButtons">
          <button
            className={`hashtagButton ${
              hashtag.includes("#아무나랑") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#아무나랑")}
          >
            #아무나랑
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#가족이랑") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#가족이랑")}
          >
            #가족이랑
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#친구랑") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#친구랑")}
          >
            #친구랑
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#나혼자") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#나혼자")}
          >
            #나혼자
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#집") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#집")}
          >
            #집
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#학교") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#학교")}
          >
            #학교
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#회사") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#회사")}
          >
            #회사
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#소풍") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#소풍")}
          >
            #소풍
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#공부") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#공부")}
          >
            #공부
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#운동") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#운동")}
          >
            #운동
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#게임") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#게임")}
          >
            #게임
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#여행") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#여행")}
          >
            #여행
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#독서") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#독서")}
          >
            #독서
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#호캉스") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#호캉스")}
          >
            #호캉스
          </button>
          <button
            className={`hashtagButton ${
              hashtag.includes("#잠") ? "selected" : ""
            }`}
            onClick={() => handleHashtagClick("#잠")}
          >
            #잠
          </button>
        </div>
        <div className="txtDiary">오늘의 일기</div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="diaryContainer"
          placeholder="오늘의 일기를 작성하세요"
        ></textarea>
        <button className="registerBtn" onClick={handleUpdate}>
          일기 수정
        </button>
      </div>
    </div>
  );
};

export default Edit;
