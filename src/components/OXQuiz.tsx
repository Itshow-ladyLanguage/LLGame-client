export default function OXQuiz({ question }: { question: string }) {
  return (
    <div
      style={{
        width: "1410px",
        height: "289.5px",
        border: "3px solid #E10CA1",
        borderRadius: "51px",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: 450,
      }}
    >
      <p style={{ fontSize: "39px" }}>Q. {question}</p>
    </div>
  );
}
