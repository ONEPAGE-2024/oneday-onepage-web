import React, { useState } from "react";
import logo from "../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import backward from "../assets/img/backward.svg";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async () => {
    setEmailError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("올바른 형식의 이메일을 입력해주세요.");
      alert("올바른 형식의 이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://10.80.162.25:8080/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (result.message === "회원 가입이 완료 되었습니다!") {
        alert("회원가입 성공!");
        if (typeof signin === "function") {
          // signin({ name, token: result.TOKEN });
        } else {
          console.warn("signin 함수가 정의되지 않았습니다.");
        }
        navigate("/signin");
      } else {
        alert("회원가입 실패!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("에러입니다!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="logoimage" className="logo" />
      <p>하루한장</p>
      <div className="input">
        <label className="name">이름</label>
        <input
          className="nameInput"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <label className="email">이메일</label>
        <input
          className="emailInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <label className="password">비밀번호</label>
        <input
          className="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <button onClick={handleSubmit} className="submit">
        회원가입
      </button>
      {/* <bu onClick={handleBack} className="backward">
        &lt;
      </bu> */}
      <h5 className="ment">회원가입</h5>
      <img src={backward} alt="backwardimage" className="backward" />
    </div>
  );
};

export default Signup;
