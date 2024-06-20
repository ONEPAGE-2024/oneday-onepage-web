import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      return;
    }

    try {
      const response = await fetch("http://10.80.161.121:8080/user/signup", {
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
    <div>
      <p>OnePage에 회원가입하세요</p>
      <div className="input">
        <label htmlFor="name">이름</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        {emailError && <p className="error-message">{emailError}</p>}
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <button onClick={handleSubmit}>확인</button>
      <span onClick={handleBack}>&lt;</span>
    </div>
  );
};

export default Signup;
