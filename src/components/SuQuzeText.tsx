import { useState, useEffect } from "react";

export default function SuQuzeText({
  onAnswered,
  clicked,
  setClicked,
  resetTrigger,
  quizId, // 추가된 prop
}: {
  onAnswered: (score: number) => void;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  resetTrigger: number;
  quizId: string; // 추가된 prop 타입
}) {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 문제 리셋되면 초기화
  useEffect(() => {
    setIsAnswered(false);
    setAnswer("");
    setScore(0);
    setIsLoading(false);
  }, [resetTrigger]);

  // API로 답변 채점하기
  const gradeAnswer = async (userAnswer: string, quizId: string) => {
    try {
      // 환경변수의 BASE_URL 사용
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`${baseUrl}/grading/${quizId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: userAnswer }),
      });

      if (!response.ok) {
        throw new Error("채점 API 호출 실패");
      }

      const result = await response.json();
      return result.score;
    } catch (error) {
      console.error("채점 오류:", error);
      return 0; // 오류 시 0점 반환
    }
  };

  const handleClick = async () => {
    if (isAnswered || !answer.trim()) return; // 입력이 없거나 이미 답변했으면 무시

    setIsAnimating(true); // 회전 애니메이션 시작
    setIsLoading(true); // 로딩 상태 시작

    try {
      // API로 답변 채점
      const receivedScore = await gradeAnswer(answer, quizId);
      setScore(receivedScore);

      // 3초 후에 스타일 변경
      setTimeout(() => {
        setIsAnswered(true); // 스타일 변경 (핑크색, 점수 표시)
        setIsAnimating(false); // 애니메이션 종료
        setIsLoading(false); // 로딩 종료

        // 추가로 1초 더 기다린 후 페이지 넘기기
        setTimeout(() => {
          onAnswered(receivedScore); // 받은 점수를 부모 컴포넌트에 전달
        }, 1000);
      }, 3000);
    } catch (error) {
      console.error("채점 중 오류 발생:", error);
      setScore(0);
      setIsAnimating(false);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={isAnimating ? "rotate-border" : ""}
      style={{
        width: "1300px",
        height: "119px",
        border: "1px solid #FBB8D4",
        borderRadius: "26px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: isAnswered ? "#E10CA1" : "#F7F7F7",
        paddingLeft: "30px", // 40px에서 30px로 축소
        paddingRight: "80px", // 버튼 공간 확보
        position: "relative",
        transition: "background-color 0.3s ease",
        boxShadow: isAnswered ? "0 6px 15px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      {/* 텍스트 영역을 별도 컨테이너로 감싸기 */}
      <div style={{ flex: 1, position: "relative" }}>
        <input
          type="text"
          placeholder="답을 입력해주세요."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          readOnly={isAnswered || isLoading}
          autoFocus
          style={{
            fontSize: "37px",
            border: "none",
            background: "none",
            display: isAnswered || isLoading ? "none" : "block",
            outline: "none",
            width: "100%",
            color: "black",
          }}
        />

        {isAnswered && (
          <div
            style={{
              fontSize: "37px",
              color: "white",
              fontWeight: "bold",
              pointerEvents: "none",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            +{score}점
          </div>
        )}

        {isLoading && (
          <div
            style={{
              fontSize: "37px",
              color: "#666",
              fontWeight: "bold",
              pointerEvents: "none",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            ..채점중..
          </div>
        )}
      </div>

      {/* 버튼을 절대 위치로 고정 */}
      <button
        onClick={handleClick}
        style={{
          position: "absolute",
          right: "20px", // 80px에서 20px로 조정
          width: "40px",
          height: "40px",
          borderRadius: "30px",
          background: "none",
          border: "none",
          cursor: isAnswered || isLoading ? "default" : "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0, // 버튼 크기 고정
        }}
        disabled={isAnswered || isLoading}
      >
        {!isLoading && !isAnswered && (
          <img
            src="/images/Send.png"
            alt="Send"
            style={{
              width: "40px",
              marginRight: "30px",
              height: "40px",
              objectFit: "contain", // 이미지 비율 유지
              pointerEvents: "none",
            }}
          />
        )}
      </button>
    </div>
  );
}
