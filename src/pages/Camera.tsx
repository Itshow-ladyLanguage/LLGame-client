import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./Camera.css";

const Camera = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [timer, setTimer] = useState<number>(5);
  const [photo, setPhoto] = useState<string | null>(null);

  // 자신의 컴퓨터 카메라를 쓸 것
  const videoConstraints = {
    facingMode: "user",
  };

  // 카운트다운
  useEffect(() => {
    if (timer > 0) {
      const timerID = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerID);
    }
    else if (timer == 0 && webcamRef.current) { // 타이머가 0이고, 웹캠이 참조 가능한 상태인가?
      const photoSrc = webcamRef.current.getScreenshot();
      if (photoSrc) {
        setPhoto(photoSrc);

        const photoLink = document.createElement("a"); // html 'a' 태그를 동적으로 생성
        photoLink.href = photoSrc;
        console.log(photoLink.href);
      }
    }
  }, [timer]);

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
              width: "950px",
              height: "550px",
              borderRadius: "42px",
              objectFit: "cover",
              marginTop: "20px",
            }}
          />
          <div
            className="overlay"
            style={{
              position: "absolute",
              top: "20px",
              left: 0,
              width: "950px",
              height: "550px",
              borderRadius: "42px",
              overflow: "hidden",
              pointerEvents: "none", // 마우스 터치 이벤트 무시 (이 코드가 없으면 클릭이 오버레이에서 먹혀서 버튼이나 웹캠 캡처가 안 될수도 있음)
              zIndex: 2,
            }}
          >
            {photo && (
              <div>
                <img
                  src={photo}
                  alt="Captured"
                  style={{
                    width: "950px",
                    height: "550px",
                    objectFit: "cover", // 캡쳐 사진 비율 맞추기
                    borderRadius: "42px",
                  }}
                />
              </div>
            )}
            <div
              className="circle-camera"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "500px",
                height: "500px",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                boxShadow: "0 0 0 310px rgba(0, 0, 0, 0.5)",
                mixBlendMode: "normal",
              }}
            />
          </div>
        </div>

        {timer > 0 && (
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
            {timer}
          </div>
        )}

        <div className="btn-container">
          <button
            type="submit"
            className="button"
            style={{
              marginRight: "13px",
            }}
            onClick={() => {
              setPhoto(null);
              setTimer(5);
            }}
          >
            다시 찍기
          </button>
          <button
            type="submit"
            className="button"
            style={{
              marginRight: "3%",
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
