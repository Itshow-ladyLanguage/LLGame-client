import { useEffect } from "react";
import Result from "../components/Result";
import html2canvas from "html2canvas";

export default function ResultPages() {
  useEffect(() => {
    document.body.style.margin = "0";

    const capture = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // 화면 렌더링이 되기 전까지 0.5초 대기
      const canvas = await html2canvas(document.body); // 화면 전체 캡쳐
      const imgUrl = canvas.toDataURL("image/png");

      console.log("캡쳐된 이미지:", imgUrl);
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
