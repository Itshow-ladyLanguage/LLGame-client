type QuzelookProps = {
  question: string;
};

export default function Quzelook({ question }: QuzelookProps) {
  return (
    <div
      style={{
        width: "1410px",
        height: "289.5px",
        border: "3px solid #E10CA1",
        borderRadius: "51px",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center", // 세로 중앙
        justifyContent: "center", // 가로 중앙
        textAlign: "center", // 텍스트 중앙 정렬
      }}
    >
      <p style={{ fontSize: "39px" }}>{question}</p>
    </div>
  );
}
