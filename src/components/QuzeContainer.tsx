import { useEffect, useState } from "react";
import Quzelook from "./Quzelook";
import QuzeButton from "./QuzeButton";
import axios from "axios";
import Bar from "./Bar"; // ← 추가

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

  useEffect(() => {
    getMultiple();
  }, []);

  // 타이머 감소 로직
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

  // 퀴즈 바뀌면 타이머 초기화
  useEffect(() => {
    setTimeLeft(60);
  }, [currentQuizIndex]);

  const getMultiple = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/multiple`);
      setQuizData(res.data);
    } catch (e) {
      console.error("Failed to retrieve quizzes : ", e);
      setError(e as any);
    } finally {
      setLoading(false);
    }
  };

  const goToNextQuiz = () => {
    setCurrentQuizIndex((prev) =>
      prev + 1 < quizData.length ? prev + 1 : 0
    );
  };

  const handleAnswerClick = (answer: string) => {
    goToNextQuiz();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>퀴즈를 불러오는 데 실패했습니다.</p>;
  if (quizData.length === 0) return <p>퀴즈가 없습니다.</p>;

  const currentQuiz = quizData[currentQuizIndex];

  return (
    <div>
      <Bar timeLeft={timeLeft} />
      <Quzelook question={currentQuiz.question} />
      <QuzeButton answers={currentQuiz.answer} onAnswerClick={handleAnswerClick} />
    </div>
  );
}
