import { useEffect, useRef } from "react";
import Result from "../components/Result";
import html2canvas from "html2canvas";

import { fstorage } from "../../firebase/firebase";
import { ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function ResultPages() {
  const hasCaptured = useRef(false);

  // 줌 방지 기능
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        (e.keyCode === 61 || e.keyCode === 107 || e.keyCode === 173 ||
          e.keyCode === 109 || e.keyCode === 187 || e.keyCode === 189 || e.keyCode === 48)
      ) {
        e.preventDefault();
      }
    };
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (hasCaptured.current) return;
    hasCaptured.current = true;
    document.body.style.margin = "0";

    const capture = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const canvas = await html2canvas(document.body);
      const imgUrl = canvas.toDataURL("image/jpg");

      if (imgUrl) {
        console.log("캡처된 사진:", imgUrl);

        const photoRef = ref(fstorage, `uploads/captureImg/${uuidv4()}.jpg`);
        uploadString(photoRef, imgUrl, "data_url")
          .then(async (snapshot) => {
            console.log("업로드 성공: ", snapshot);

            const email = localStorage.getItem("userEmail");
            if (!email) {
              console.warn("이메일 정보가 없습니다.");
              return;
            }

            try {
              await axios.post(`${import.meta.env.VITE_BASE_URL}/send-email`, {
                email,
                image: imgUrl,
              });
              console.log("이메일 전송 성공");
            } catch (error) {
              console.error("이메일 전송 실패", error);
            }
          })
          .catch((err) => {
            console.error("업로드 실패: ", err);
          });
      }
    };

    capture();
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "15px",
          background: "#E10CA1",
          marginTop: "96px",
          marginBottom: "60px",
        }}
      />
      <div>
        <Result />
      </div>
    </div>
  );
}