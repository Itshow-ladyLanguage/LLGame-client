import React, { useRef } from "react";
import Webcam from "react-webcam";
import "./Camera.css";

const Camera = () => {
  const webcamRef = useRef(null);

  const videoConstraints = {
    facingMode: "user",
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
          width: "1100px",
          height: "750px",
          border: "3px solid #850E35",
          display: "flex",
          alignItems: "center", // 세로 중앙 정렬
          flexDirection: "column",
        }}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored={true}
          videoConstraints={videoConstraints}
          style={{
            width: "960px",
            height: "580px",
            borderRadius: "42px",
            objectFit: "cover",
            marginTop: "60px"
          }}
        />
        <div className="btn-container">
          <button
            type="submit"
            className="button"
            style={{
              marginRight: "13px",
            }}
          >
            다시 찍기
          </button>
          <button
            type="submit"
            className="button"
            style={{
              marginRight: "7%",
            }}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default Camera;
