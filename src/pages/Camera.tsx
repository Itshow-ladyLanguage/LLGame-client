import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./Camera.css";

import { fstorage } from "../../firebase/firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Camera = () => {
  const navigate = useNavigate();
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
      const photoSrc = webcamRef.current.getScreenshot(); //웹캠으로 사진찍은 화면을 이미지로 저장
      
      if (photoSrc) {
        setPhoto(photoSrc);
        console.log("캡처된 사진:", photoSrc);

        const photoRef = ref(fstorage, `uploads/cameraImg/${uuidv4()}.jpg`); //uuidv4(): 고유한 아이디를 만들어주는 함수
        uploadString(photoRef, photoSrc, "data_url")
        //uploadString(): 문자열 형태로 이미지를 저장할 때 사용하는 함수
        //"data_url": 업로드할 문자열이 data URL 형식임
          .then((snapshot) => { //snapshot: Firebase Storage에 무엇이 올라갔고, 어디에 저장됐고, 어떤 경로로 접근할 수 있는지 알려줌
            console.log("업로드 성공: ", snapshot);
            return getDownloadURL(snapshot.ref);
          })
          .catch((err) => {
            console.error("업로드 실패: ", err);
          });
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
          onClick={() => navigate("/QuzePages")}
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
