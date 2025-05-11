import React from "react";
import "./Login.css";

const Login = () => {
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
          height: "681px",
          border: "3px solid #850E35",
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '280px',
          }}
        >
          <input
            type="text"
            placeholder="이름을 적어주세요."
            className="input-box"
            style={{
              marginBottom: "20px"
            }}
          />
          <input
            type="tel"
            placeholder="전화번호를 적어주세요. (선택 / 상위 3등 시 선물 제공 목적)"
            className="input-box"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
