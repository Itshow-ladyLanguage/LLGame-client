import { useEffect, useRef } from "react";
import Result from "../components/Result";
import html2canvas from "html2canvas";

import { fstorage } from "../../firebase/firebase";
import { ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export default function ResultPages() {
  const hasCaptured = useRef(false); // 컴포넌트를 가져와서 쓰기 때문에 useEffect가 두 번 실행되어 사진이 두 개 저장되는 걸 방지

  useEffect(() => {
    if (hasCaptured.current) return;
    hasCaptured.current = true;
    document.body.style.margin = "0";

    const capture = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // 화면 렌더링이 되기 전까지 0.5초 대기
      const canvas = await html2canvas(document.body); // 화면 전체 캡쳐
      const imgUrl = canvas.toDataURL("image/jpg");

      if (imgUrl) {
        console.log("캡처된 사진:", imgUrl);

        const photoRef = ref(fstorage, `uploads/captureImg/${uuidv4()}.jpg`); //uuidv4(): 고유한 아이디를 만들어주는 함수
        uploadString(photoRef, imgUrl, "data_url")
          //uploadString(): 문자열 형태로 이미지를 저장할 때 사용하는 함수
          //"data_url": 업로드할 문자열이 data URL 형식임
          .then((snapshot) => {
            //snapshot: Firebase Storage에 무엇이 올라갔고, 어디에 저장됐고, 어떤 경로로 접근할 수 있는지 알려줌
            console.log("업로드 성공: ", snapshot);
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
