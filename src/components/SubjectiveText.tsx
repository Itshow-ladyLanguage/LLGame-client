import { useEffect } from "react";
export default function Subjective() {
  useEffect(() => {
    document.body.style.margin = "0";
  }, []);
  return (
    <div>
      <div
        style={{
          width: "1350px",
          height: "129px",
          border: "1px solid #FBB8D4",
          borderRadius: "26px",
          display: "flex", // 가로 정렬
          padding: "px",
          backgroundColor: "#F7F7F7"
        }}
      >
      </div>
    </div>
  );
}
