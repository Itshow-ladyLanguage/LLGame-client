import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Webcam from "react-webcam";
import "./Camera.css";

import { fstorage } from "../../firebase/firebase"; // 파이어베이스 설정 파일
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Camera = () => {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam | null>(null);
  const [timer, setTimer] = useState<number>(5);
  const [photo, setPhoto] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const userid = parseInt(searchParams.get("id") as string);

  const userId = localStorage.getItem("userId");

  const videoConstraints = {
    facingMode: "user",
  };

  useEffect(() => {
    if (timer > 0) {
      const timerID = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerID);
    } else if (timer === 0 && webcamRef.current) {
      const photoSrc = webcamRef.current.getScreenshot();
      if (photoSrc) {
        const photoRef = ref(fstorage, `uploads/cameraImg/${uuidv4()}.jpg`);

        uploadString(photoRef, photoSrc, "data_url")
          .then((snapshot) => getDownloadURL(snapshot.ref))
          .then((downloadURL) => {
            setPhoto(downloadURL); // URL 화면에 표시
            console.log("업로드된 이미지 URL:", downloadURL);
            return axios.patch(
              `${import.meta.env.VITE_BASE_URL}/users/${userId}`,
              {
                profile_image: downloadURL,
                
              }
            );
          })
          .then((res) => {
            console.log("사진 저장 완료", res.data);
          })
          .catch((err) => {
            console.error("이미지 업로드 실패:", err);
          });
      }
    }
  }, [timer]);

  const handleUploadAndNavigate = () => {
    if (!photo) return;
    navigate("/QuzePages");
  };

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
          alignItems: "center",
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
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            {photo && (
              <img
                src={photo}
                alt="Captured"
                style={{
                  width: "950px",
                  height: "550px",
                  objectFit: "cover",
                  borderRadius: "42px",
                }}
              />
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
            type="button"
            className="button"
            style={{ marginRight: "13px" }}
            onClick={() => {
              setPhoto(null);
              setTimer(5);
            }}
          >
            다시 찍기
          </button>

          <button
            type="button"
            className="button"
            style={{ marginRight: "3%" }}
            onClick={handleUploadAndNavigate}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default Camera;
