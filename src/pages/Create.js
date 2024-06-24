import "../styles/Create.css";
import Header from "../components/Header";
import axios from "axios";
import { useState } from "react";

const Create = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [content, setContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("happy");

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

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://10.80.163.119:8080/diary/create",
        {
          emotion: selectedEmotion,
          hashtags: hashtags.join(", "),
          content: content,
          regDate: selectedDate,
        }
      );
      console.log("Diary created:", response.data);
    } catch (error) {
      console.error("Error creating diary:", error);
    }
  };

  const handleHashtagClick = (tag) => {
    const index = hashtags.indexOf(tag);
    if (index === -1) {
      setHashtags([...hashtags, tag]);
    } else {
      const updatedHashtags = [...hashtags];
      updatedHashtags.splice(index, 1);
      setHashtags(updatedHashtags);
    }
  };

  return (
    <>
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
                hashtags.includes("#아무나랑") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#아무나랑")}
            >
              #아무나랑
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#가족이랑") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#가족이랑")}
            >
              #가족이랑
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#친구랑") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#친구랑")}
            >
              #친구랑
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#나혼자") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#나혼자")}
            >
              #나혼자
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#집") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#집")}
            >
              #집
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#학교") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#학교")}
            >
              #학교
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#회사") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#회사")}
            >
              #회사
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#소풍") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#소풍")}
            >
              #소풍
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#공부") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#공부")}
            >
              #공부
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#운동") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#운동")}
            >
              #운동
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#게임") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#게임")}
            >
              #게임
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#여행") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#여행")}
            >
              #여행
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#독서") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#독서")}
            >
              #독서
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#호캉스") ? "selected" : ""
              }`}
              onClick={() => handleHashtagClick("#호캉스")}
            >
              #호캉스
            </button>
            <button
              className={`hashtagButton ${
                hashtags.includes("#잠") ? "selected" : ""
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
    </>
  );
};

export default Create;
