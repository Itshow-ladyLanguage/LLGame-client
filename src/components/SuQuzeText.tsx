import { useState, useEffect } from "react";

export default function SuQuzeText({
  onAnswered,
  clicked,
  setClicked,
  resetTrigger,
  quizId,
}: {
  onAnswered: (score: number) => void;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  resetTrigger: number;
  quizId: string;
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

  // 전체 박스 둘레 계산: width=1300, height=119, radius=26
  const fullPerimeter = 2 * (1300 + 119) - 4 * 26 + 2 * Math.PI * 26;
  const fullDashLength = Math.round(fullPerimeter);

  return (
    <>
      <style>
        {`

          
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(225, 12, 161, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(225, 12, 161, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(225, 12, 161, 0);
            }
          }
          
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          
          .loading-input {
            position: relative;
            animation: pulse 2s infinite;
          }
          
          .shimmer-effect {
            background: linear-gradient(
              90deg,
              #F7F7F7 25%,
              #FBB8D4 50%,
              #F7F7F7 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
        `}
      </style>

      <div
        className={`${isAnimating ? "rotate-border" : ""} ${
          isLoading ? "loading-input shimmer-effect" : ""
        }`}
        style={{
          width: "1300px",
          height: "119px",
          border: isLoading ? "2px solid #E10CA1" : "1px solid #FBB8D4",
          borderRadius: "26px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: isAnswered
            ? "#E10CA1"
            : isLoading
            ? "transparent"
            : "#F7F7F7",
          paddingLeft: "30px",
          paddingRight: "30px",
          position: "relative",
          transition: "all 0.3s ease",
          boxShadow: isAnswered ? "0 6px 15px rgba(0, 0, 0, 0.2)" : "none",
          overflow: "hidden",
        }}
      >
        {/* 텍스트 영역을 별도 컨테이너로 감싸기 */}
        <div
          style={{
            flex: 1,
            position: "relative",
            marginRight: "20px",
            zIndex: 5,
          }}
        >
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
                left: "52%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              +{score}점
            </div>
          )}

          {isLoading && (
            <div
              style={{
                fontSize: "37px",
                color: "#E10CA1",
                fontWeight: "bold",
                pointerEvents: "none",
                position: "absolute",
                left: "53%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                textShadow: "0 0 10px rgba(225, 12, 161, 0.5)",
              }}
            >
              채점중
            </div>
          )}
        </div>

        {/* 버튼을 인풋박스 내부 오른쪽에 배치 */}
        <button
          onClick={handleClick}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "none",
            border: "none",
            cursor: isAnswered || isLoading ? "default" : "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            zIndex: 5,
            transition: "transform 0.2s ease",
            transform: isLoading ? "scale(0.9)" : "scale(1)",
          }}
          disabled={isAnswered || isLoading}
        >
          {!isLoading && !isAnswered && (
            <img
              src="/images/Send.png"
              alt="Send"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
                pointerEvents: "none",
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
              }}
            />
          )}

          {isLoading && (
            <div
              style={{
                width: "20px",
                height: "20px",
                border: "2px solid #E10CA1",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          )}
        </button>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
}
