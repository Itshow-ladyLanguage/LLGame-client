import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // 줌 방지 기능
  useEffect(() => {
    // 키보드 줌 방지 (Ctrl + +/-, Ctrl + 0)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        (e.keyCode === 61 || // Ctrl + +
          e.keyCode === 107 || // Numpad +
          e.keyCode === 173 || // Ctrl + -
          e.keyCode === 109 || // Numpad -
          e.keyCode === 187 || // Ctrl + =
          e.keyCode === 189 || // Ctrl + -
          e.keyCode === 48) // Ctrl + 0
      ) {
        e.preventDefault();
      }
    };

    // 마우스 휠 줌 방지 (Ctrl + 휠)
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleWheel, { passive: false });

    // 클린업
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 7) {
      setName(value);
    }
  };

  const postUser = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(name, email);

      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, {
        name,
        email,
      });
      console.log("유저 생성 성공", res.data);

      // 로컬스토리지에 유저 ID 저장
      localStorage.setItem("userId", res.data.id);
      console.log(localStorage.getItem("userId"));
      console.log(localStorage.getItem("userId"));

      // 페이지 이동
      navigate("/camera");
    } catch (e) {
      console.error("유저 생성 실패 : ", e);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "98vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#E10CA1",
          padding: "20px",
          borderRadius: "72px",
          width: "700px",
          height: "500px",
          border: "3px solid #850E35",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "-40px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFD6F3",
              padding: "10px",
              borderRadius: "100px",
              width: "110px",
              height: "110px",
              border: "3px solid #850E35",
              marginTop: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/images/camera.png"
              style={{
                width: "48px",
                height: "43px",
              }}
            ></img>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <input
            autoFocus
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="이름을 적어주세요."
            className="input-box"
            style={{ marginBottom: "20px" }}
            maxLength={7}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 적어주세요. (테스트 결과 사진 전송 목적)"
            className="input-box"
          />
        </div>
        <button
          onClick={postUser}
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: "150px",
            height: "55px",
            borderRadius: "15px",
            backgroundColor: isHovered ? "#F0B1DD" : "#F7F7F7",
            border: "3px solid #E10CA1",
            outline: "none",
            color: "#E10CA1",
            fontSize: "25px",
            fontFamily: "'Pretendard-Regular', sans-serif",
            fontWeight: 700,
            textAlign: "center",
            marginLeft: "auto",
            display: "block",
            marginTop: "30px",
            marginRight: "10%",
            cursor: "pointer",
            transition: "background-color 0.3s ease", // 부드러운 전환
          }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default Login;
