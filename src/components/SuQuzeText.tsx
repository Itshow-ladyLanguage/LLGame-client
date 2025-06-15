import { useState, useEffect } from "react";

export default function SuQuzeText({
  onAnswered,
  clicked,
  setClicked,
  resetTrigger,
}: {
  onAnswered: () => void;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  resetTrigger: number;
}) {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [answer, setAnswer] = useState("");

  // 문제 리셋되면 초기화
  useEffect(() => {
    setIsAnswered(false);
    setAnswer("");
  }, [resetTrigger]);

  const handleClick = () => {
    if (isAnswered || !answer.trim()) return; // 입력이 없거나 이미 답변했으면 무시

    setIsAnimating(true);       // 회전 애니메이션 시작
    setIsAnswered(true);        // 먼저 점수 보이도록 상태 변경

    setTimeout(() => {
      setIsAnimating(false);    // 애니메이션 종료
      onAnswered();             // 그다음 문제 넘기기!
    }, 3000);                   // 3초 후 실행
  };

  return (
    <div
      className={isAnimating ? "rotate-border" : ""}
      style={{
        width: "1400px",
        height: "119px",
        border: "1px solid #FBB8D4",
        borderRadius: "26px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: isAnswered ? "#E10CA1" : "#F7F7F7",
        paddingLeft: "40px",
        position: "relative",
        transition: "background-color 0.3s ease",
        boxShadow: isAnswered ? "0 6px 15px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      <input
        type="text"
        placeholder="답을 입력해주세요."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        readOnly={isAnswered}
        style={{
          fontSize: "37px",
          border: "none",
          background: "none",
          display: isAnswered ? "none" : "block",
          outline: "none",
          flex: 1,
          color: isAnswered ? "white" : "black",
        }}
      />

      {isAnswered && (
        <div
          style={{
            position: "absolute",
            left: "40px",
            fontSize: "37px",
            color: "white",
            flex: 1,
            fontWeight: "bold",
            pointerEvents: "none",
          }}
        >
          +3점
        </div>
      )}

      <button
        onClick={handleClick}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "30px",
          background: "none",
          border: "none",
          cursor: isAnswered ? "default" : "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        disabled={isAnswered}
      >
        <img
          src="/images/Send.png"
          alt="Send"
          style={{
            height: "100%",
            paddingRight: "80px",
            pointerEvents: isAnswered ? "none" : "auto",
          }}
        />
      </button>
    </div>
    
  );
}
