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

  const goToNextQuiz = () => {
    if (currentQuizIndex + 1 < quizData.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      navigate("/OXQuizPages", { state: { initialScore: totalScore } }); // 문제 끝나면 OX 퀴즈 페이지 이동
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
      <div style={{ marginBottom: "28px" }}>
        <Bar timeLeft={timeLeft} />
      </div>
      <Quzelook question={currentQuiz.question} />
      <div style={{ marginTop: "87.5px" }}>
      <QuzeButton
        answers={currentQuiz.answer}
        scores={currentQuiz.score as number[]}
        onAnswerClick={(score) => {
          setTotalScore((prev) => {
            const newScore = prev + score;
            console.log("누적 점수:", newScore);
            return newScore;
          });
          goToNextQuiz();
        }}
        resetTrigger={resetTrigger}
      />
      </div>
      <PageNumber current={currentQuizIndex + 1} total={quizData.length} />
    </div>
  );
}