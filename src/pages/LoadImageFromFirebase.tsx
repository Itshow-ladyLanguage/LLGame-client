import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ShowImageOnLoad: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      const storage = getStorage();
      const filePath = "2ed30584-676d-44db-aa23-7869fb38c284.jpg"; // 전하의 파일 경로
      const fileRef = ref(storage, filePath);

      try {
        const url = await getDownloadURL(fileRef);
        setImageUrl(url);
        console.log("👑 자동으로 이미지 불러오기 성공:", url);
      } catch (err) {
        console.error("⚠️ 이미지 불러오기 실패:", err);
      }
    };

    fetchImage(); // 👑 컴포넌트가 로드되자마자 실행되옵니다
  }, []);

  return (
    <div>
      <h3>🖼️ 자동으로 불러온 이미지</h3>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Loaded from Firebase"
          style={{
            width: "180px",
            height: "180px",
            marginBottom: "36px",
            borderRadius: "12px",
            border: "2px solid royalblue",
          }}
        />
      ) : (
        <p>불러오는 중이옵니다…</p>
      )}
    </div>
  );
};

export default ShowImageOnLoad;
