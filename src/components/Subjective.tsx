export default function Subjective({ question }: { question: string }) {
  return (
    <div
      style={{
        width: "1310px",
        height: "471px",
        border: "3px solid #E10CA1",
        borderRadius: "34px",
        display: "flex",
        alignItems: "center", // 세로 정렬
        justifyContent: "center", // 가로 정렬
        padding: "0 40px",
        textAlign: "center", // 텍스트 가운데 정렬
      }}
    >
      <p style={{ fontSize: "39px" }}>Q. {question}</p>
    </div>
  );
}
