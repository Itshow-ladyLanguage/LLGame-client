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
          height: "471px",
          border: "3px solid #E10CA1",
          borderRadius: "34px",
          display: "flex", // 가로 정렬
          alignItems: "center", // 세로 중앙 정렬
          justifyContent: "space-between", // 양 끝 정렬
          padding: "0 40px",
        }}
      >
        <p
          style={{
            fontSize: "39px",
            lineHeight: "1.5",
            fontWeight: "bold",
            marginLeft: "200px",
            textAlign: "center",
          }}
        >
          다음 대화에서
          <br />
          여자가 화가 난 이유는?
        </p>
        <img
          src="/images/talk.png"
          style={{
            width: "472.5px",
            height: "391.46px",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}
