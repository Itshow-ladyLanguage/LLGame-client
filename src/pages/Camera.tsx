import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./Camera.css";

const Camera = () => {
  const webcamRef = useRef(null);
  const [time, setTime] = useState<number>(5);

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
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundColor: "#E10CA1",
          padding: "20px",
          borderRadius: "72px",
          width: "1000px",
          height: "650px",
          border: "3px solid #850E35",
          display: "flex",
          alignItems: "center", // 세로 중앙 정렬
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div style={{ position: "relative" }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored={true}
            videoConstraints={videoConstraints}
            style={{
              width: "860px",
              height: "480px",
              borderRadius: "42px",
              objectFit: "cover",
              marginTop: "60px",
            }}
          />
          <div
            className="overlay"
            style={{
              position: "absolute",
              top: "60px",
              left: 0,
              width: "860px",
              height: "480px",
              borderRadius: "42px",
              overflow: "hidden",
              pointerEvents: "none" /* 마우스 터치 이벤트 무시 (이 코드가 없으면 클릭이 오버레이에서 먹혀서 버튼이나 웹캠 캡처가 안 될수도 있음) */,
              zIndex: 2,
            }}
          >
            <div
              className="circle-camera"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "400px",
                height: "400px",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                boxShadow: "0 0 0 310px rgba(0, 0, 0, 0.5)",
                mixBlendMode: "normal",
              }}
            />
          </div>
        </div>

        {time > 0 && (
          <div
            style={{
              position: "absolute",
              top: "48%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "150px",
              color: "#E10CA1",
              fontWeight: "bold",
              fontFamily: "'Pretendard-Regular', sans-serif",
              zIndex: 3,
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
