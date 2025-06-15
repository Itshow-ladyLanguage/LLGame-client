import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Bar from "../components/Bar";
import PageNumber from "../components/PageNumber";
import SuQuzeText from "../components/SuQuzeText";
import Subjective from "../components/Subjective";

type SuQuizType = {
  type: string;
  question: string;
  answer: string;
  score: number;
};

export default function OXQuizPages() {
  const [quizData, setQuizData] = useState<SuQuizType[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/quiz/short`
        );
        setQuizData(res.data);
      } catch (error) {
        console.error("퀴즈 데이터 불러오기 실패:", error);
      }
    };
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (currentIndex >= quizData.length) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          goToNextQuestion();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, quizData.length]);

  const goToNextQuestion = () => {
    setClicked(false);
    setTimeLeft(60);
    setResetTrigger((prev) => prev + 1);
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/SuQuzePages");
    }
  };

  if (quizData.length === 0) {
    return <div style={{ marginTop: "96px" }}>퀴즈를 불러오는 중입니다</div>;
  }

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
      <Subjective question={quizData[currentIndex].question} />
      <div style={{ marginTop: "87.5px" }}>
        <SuQuzeText
        // answer={quizData[currentIndex].answer}
        // onAnswered={goToNextQuestion}
        // clicked={clicked}
        // setClicked={setClicked}
        // resetTrigger={resetTrigger}
        />
      </div>
      <PageNumber current={currentIndex + 1} total={quizData.length} />
    </div>
  );
}
