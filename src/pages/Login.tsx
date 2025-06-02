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
          <div style={{
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
          }}>
          <img
            src="/images/camera.png"
            style={{
              width: "48px",
              height: "43px"
            }}>
            </img>
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
            type="text"
            placeholder="이름을 적어주세요."
            className="input-box"
            style={{
              marginBottom: "20px",
            }}
          />
          <input
            type="email"
            placeholder="이메일을 적어주세요. (테스트 결과 사진 전송 목적)"
            className="input-box"
          />
        </div>
        <button
          onClick={() => navigate("/camera")}
          type="submit"
          style={{
            width: "150px",
            height: "55px",
            borderRadius: "50px",
            backgroundColor: "#F7F7F7",
            border: "3px solid #EE6983",
            outline: "none",
            color: "#EE6983",
            fontSize: "25px",
            fontFamily: "'Pretendard-Regular', sans-serif",
            fontWeight: 700,
            textAlign: "center",
            marginLeft: "auto", // 오른쪽 배치
            display: "block",
            marginTop: "30px",
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
