import { useEffect, useState } from "react";
import Quzelook from "../components/Quzelook";
import QuzeButton from "../components/QuzeButton";
import axios from "axios";
import Bar from "../components/Bar";
import { useNavigate } from "react-router-dom";
import PageNumber from "../components/PageNumber";

type QuizType = {
  type: string;
  question: string;
  answer: string[];
  score: number[] | number | string;
};

export default function QuzeContainer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizData, setQuizData] = useState<QuizType[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();
  const [totalScore, setTotalScore] = useState(0);

  const [resetTrigger, setResetTrigger] = useState(0);
  // 줌 방지 기능
  useEffect(() => {
    // 키보드 줌 방지 (Ctrl + +/-, Ctrl + 0)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        (e.keyCode === 61 || // Ctrl + +
          e.keyCode === 107 || // Numpad +
          e.keyCode === 173 || // Ctrl + -
          e.keyCode === 109 || // Numpad -
          e.keyCode === 187 || // Ctrl + =
          e.keyCode === 189 || // Ctrl + -
          e.keyCode === 48) // Ctrl + 0
      ) {
        e.preventDefault();
      }
    };

    // 마우스 휠 줌 방지 (Ctrl + 휠)
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleWheel, { passive: false });

    // 클린업
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    getMultiple();
  }, []);

  useEffect(() => {
    setTimeLeft(60);
    setResetTrigger((prev) => prev + 1); // 버튼 초기화를 위해
  }, [currentQuizIndex]);

  // 타이머 감소
  useEffect(() => {
    if (timeLeft <= 0) {
      goToNextQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const getMultiple = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/quiz/multiple`
      );
      setQuizData(res.data);
    } catch (e) {
      console.error("Failed to retrieve quizzes : ", e);
      setError(e as any);
    } finally {
      setLoading(false);
    }
  };

  const goToNextQuiz = (scoreToAdd?: number) => {
    // 점수가 전달된 경우 먼저 누적하고 다음 페이지로 이동 처리
    if (scoreToAdd !== undefined) {
      setTotalScore((prev) => {
        const newTotal = prev + scoreToAdd;
        console.log("최종 점수:", scoreToAdd, "누적 점수:", newTotal);

        // 마지막 문제인 경우 점수 누적 후 다음 페이지로 이동
        if (currentQuizIndex + 1 >= quizData.length) {
          console.log("마지막 문제 완료 - 최종 점수:", newTotal);
          // 상태 업데이트 후 navigate 실행
          setTimeout(() => {
            navigate("/OXQuizPages", {
              state: {
                initialScore: newTotal,
              },
            });
          }, 100);
          return newTotal;
        }

        return newTotal;
      });
    }

    // 마지막 문제가 아닌 경우에만 다음 문제로 이동
    if (currentQuizIndex + 1 < quizData.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else if (scoreToAdd === undefined) {
      // 시간 초과로 마지막 문제에 도달한 경우
      console.log("시간 초과 - 현재 점수로 이동:", totalScore);
      navigate("/OXQuizPages", {
        state: {
          initialScore: totalScore,
        },
      });
    }
  };

  const handleAnswerClick = (score: number) => {
    // 선택한 버튼 점수 * 2 + 남은시간
    const finalScore = score * 2 + timeLeft;

    if (currentQuizIndex + 1 >= quizData.length) {
      // 마지막 문제인 경우: 최종 점수를 포함해서 호출
      goToNextQuiz(finalScore);
    } else {
      // 마지막 문제가 아닌 경우: 점수 누적 후 다음 문제로
      setTotalScore((prev) => {
        const newScore = prev + finalScore;
        console.log(
          "기본 점수:",
          score,
          "점수 * 2:",
          score * 2,
          "남은 시간:",
          timeLeft,
          "최종 점수:",
          finalScore,
          "누적 점수:",
          newScore
        );
        return newScore;
      });
      goToNextQuiz();
    }
  };

  if (loading) return <p></p>;
  if (error) return <p></p>;
  if (quizData.length === 0) return <p></p>;

  const currentQuiz = quizData[currentQuizIndex];

  return (
    <div
      style={{
        marginTop: "96px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "35px" }}>
        <Bar timeLeft={timeLeft} />
      </div>
      <Quzelook question={currentQuiz.question} />
      <div style={{ marginTop: "87.5px" }}>
        <QuzeButton
          answers={currentQuiz.answer}
          scores={currentQuiz.score as number[]}
          onAnswerClick={handleAnswerClick}
          resetTrigger={resetTrigger}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "35px",
        }}
      >
        <PageNumber current={currentQuizIndex + 1} total={quizData.length} />
      </div>
    </div>
  );
}
