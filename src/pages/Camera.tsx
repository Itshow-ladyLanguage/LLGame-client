import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./Camera.css";

const Camera = () => {
  const webcamRef = useRef(null);
  const [time, setTime] = useState<number>(3);

  // 자신의 컴퓨터 카메라를 쓸 것
  const videoConstraints = {
    facingMode: "user",
  };

  //카운트다운
  useEffect(() => {
    time > 0 && setTimeout(() => setTime(time - 1), 1000);
  }, [time]);

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
            marginTop: "60px",
          }}
        />
        {time > 0 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "150px",
              color: "#FFCEF0",
              fontWeight: "bold",
              fontFamily: "'Pretendard-Regular', sans-serif",
            }}
          >
            {time}
          </div>
        )}
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
