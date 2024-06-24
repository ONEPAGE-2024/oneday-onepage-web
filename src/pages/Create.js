import "../styles/Create.css";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api"

const Create = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [hashtag, setHashtag] = useState([]);
  const [content, setContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("happy");
  const navigate = useNavigate();

  const emotions = [
    { id: "happy", icon: "😊" },
    { id: "sad", icon: "😢" },
    { id: "angry", icon: "😡" },
    { id: "notbad", icon: "🙁" },
    { id: "good", icon: "🙂" },
  ];

  const handleEmotionClick = (emotionId) => {
    setSelectedEmotion(emotionId);
  };

  const handleRegister = async () => {
    try {
      const postData = {
        id: 1, 
        emotion: selectedEmotion,
        hashtag: hashtag,
        content: content,
      };

      if (!selectedDate || !content) {
        alert("날짜와 내용을 모두 입력해주세요.");
        return;
      }

      const response = await createPost(postData);
      console.log("일기가 생성되었습니다:", response.data);
      navigate("/");

    } catch (error) {
      console.error("일기를 생성하는데 오류가 생겼습니다:", error);
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

  return (
    <div className="container">
      <Header title="일기장" />
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
        <button className="registerBtn" onClick={handleRegister}>
          일기 등록
        </button>
      </div>
    </div>
  );
};

export default Create;
