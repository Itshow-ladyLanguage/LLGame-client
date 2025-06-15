import { useEffect, useState } from "react";

export default function Subjective() {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  const handleClick = () => {
    // if (isAnswered || !answer.trim()) return; // 입력시 해야 넘어감

    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      setIsAnswered(true);
    }, 3000);
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
        value={isAnswered ? answer : answer}
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
          {/* 점수 조건 위치 */}
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

      <style>{`
        .rotate-border {
          animation: rotate 3s linear;
        }
      `}</style>
    </div>
  );
}
