import { useEffect, useState } from "react";
import Quzelook from "./Quzelook";
import QuzeButton from "./QuzeButton";
import axios from "axios";

// 타입 선언 (옵션)
type QuizType = {
  type: string;
  question: string;
  answer: string[];
  score: number[] | number | string;
};

export default function QuzeContainer() {
  console.log("QuzeContainer 렌더링");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState("");
  const [quizData, setQuizData] = useState<QuizType[]>([]); // 전체 데이터 저장

  //   useEffect(() => {
  //     console.log("useEffect 실행됨");
  //     async function fetchQuiz() {
  //       const res = await axios.get(
  //         `${import.meta.env.VITE_BASE_URL}/quiz/multiple`
  //       );
  //       const data: QuizType[] = await res.data;
  //       console.log("fetchQuiz data:", data);
  //       if (data && data.length > 0) {
  //         setQuizData(data);
  //         setQuestion(data[0].question); // 첫 질문 설정
  //       }
  //     }
  //     fetchQuiz();
  //   }, []);

  useEffect(() => {
    getMultiple();
  }, []);

  const getMultiple = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/quiz/multiple`
      );
      setQuizData(res.data);
      console.log(quizData);
    } catch (e) {
      console.error("Failed to retrieve quizzes : ", e);
      setError(error); //e에서 error로 잠시 변경
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Quzelook question={question} />
      <QuzeButton answers={quizData} /> {/* 전체 데이터 전달 */}
    </div>
  );
}
