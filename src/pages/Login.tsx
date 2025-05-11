import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
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
          width: "892px",
          height: "612px",
          border: "3px solid #850E35",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => navigate("/camera")}
            style={{
              backgroundColor: "#FFD6F3",
              border: "3px solid #850E35",
              borderRadius: "50%",
              width: "134px",
              height: "134px",
              cursor: "pointer",
              marginTop: "30px",
              backgroundImage: "url('/images/camera.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}
          ></button>
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
            type="text"
            placeholder="이름을 적어주세요."
            className="input-box"
            style={{
              marginBottom: "20px",
            }}
          />
          <input
            type="tel"
            placeholder="전화번호를 적어주세요. (선택 / 상위 3등 시 선물 제공 목적)"
            className="input-box"
          />
        </div>
        <button
          type="submit"
          style={{
            width: "169px",
            height: "64px",
            borderRadius: "50px",
            backgroundColor: "#F7F7F7",
            border: "3px solid #EE6983",
            outline: "none",
            color: "#EE6983",
            fontSize: "30px",
            fontFamily: "'Pretendard-Regular', sans-serif",
            fontWeight: 700,
            textAlign: "center",
            marginLeft: "auto", // 오른쪽 배치
            display: "block",
            marginTop: "50px",
            marginRight: "10%",
            cursor: "pointer",
          }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default Login;
