import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import "../styles/Signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setEmailError("");

    if (!email || !password) {
      setEmailError("이메일과 비밀번호를 모두 입력하세요.");
      return;
    }

    try {
      const response = await fetch("http://3.38.61.26:80/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const result = await response.json();
      console.log("Response from server:", result);
      if (result.token) {
        navigate("/");
      } else {
        setEmailError("로그인 실패! 이메일이나 비밀번호를 확인하세요.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("에러입니다");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="signin-container">
      <img src={logo} alt="logoimage" className="logo" />
      <p>하루한장</p>
      <label className="Signinemail">이메일</label>
      <input
        id="email"
        className="emailInputBox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      {emailError && <p className="Signinerror-message">{emailError}</p>}
      <label className="Signinpassword">비밀번호</label>
      <input
        id="password"
        className="passwordInputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="Signinbutton" onClick={handleLogin}>
        로그인
      </button>
      <span className="Signinnavigate" onClick={handleSignUp}>
        회원가입
      </span>
      <h5 className="bar">|</h5>
      <span className="findpassword">비밀번호 찾기</span>
    </div>
  );
};

export default Signin;
