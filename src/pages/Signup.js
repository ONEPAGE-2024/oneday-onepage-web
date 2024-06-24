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
  const [signupMessage, setSignupMessage] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async () => {
    setEmailError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("올바른 형식의 이메일을 입력해주세요.");
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

      if (response.ok) {
        setSignupMessage("회원가입 성공!");
        navigate("/signin");
      } else {
        setSignupMessage("회원가입 실패!");
      }
    } catch (error) {
      console.error("Error:", error);
      setSignupMessage("에러입니다!");
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
        {emailError && <p className="error-message">{emailError}</p>}
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
      {signupMessage && <p className="signup-message">{signupMessage}</p>}
      <img
        src={backward}
        alt="backwardimage"
        className="backward"
        onClick={handleBack}
      />
    </div>
  );
};

export default Signup;
