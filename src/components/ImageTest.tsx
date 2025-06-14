import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import 
export default function ImageTest() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const folderRef = ref(storage, "uploads/cameralmg/");
        const result = await listAll(folderRef);

        if (result.items.length === 0) {
          console.log("이미지가 없습니다.");
          return;
        }

        const latestRef = result.items[result.items.length - 1];
        const url = await getDownloadURL(latestRef);
        setImageUrl(url);
      } catch (error) {
        console.error("이미지 로드 오류:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>테스트 이미지</h2>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="테스트 이미지"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "50%",
            border: "3px solid #E10CA1",
          }}
        />
      ) : (
        <p>이미지를 불러오는 중...</p>
      )}
    </div>
  );
}
