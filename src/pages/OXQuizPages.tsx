import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";

import Bar from "../components/Bar";
import OXQuiz from "../components/OXQuiz";
import OXQuizButton from "../components/OXPuizButton";
import PageNumber from "../components/PageNumber";

type OXQuizType = {
  type: string;
  question: string;
  answer: string[]; // JSON 배열로 받아오기
  score: number[];  // JSON 배열로 받아오기
};

export default function OXQuizPages() {
  const [quizData, setQuizData] = useState<OXQuizType[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const [resetTrigger, setResetTrigger] = useState(0);

  const location = useLocation();
  const initialScore = Number(location.state?.initialScore ?? 0);
  const [totalScore, setTotalScore] = useState<number>(initialScore);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/ox`);
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
    return <div></div>;
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
      <OXQuiz question={quizData[currentIndex].question} />
      <div style={{ marginTop: "87.5px" }}>
        <OXQuizButton
          answer={quizData[currentIndex].answer}
          scoreArray={quizData[currentIndex].score}
          onAnswered={(score: number) => {
            setTotalScore((prev) => {
              const newTotal = prev + Number(score);
              console.log("누적 점수:", newTotal);
              return newTotal;
            });            
            setTimeout(() => {
              goToNextQuestion();
            }, 800);
          }}
          clicked={clicked}
          setClicked={setClicked}
          resetTrigger={resetTrigger}
        />
      </div>
      <PageNumber current={currentIndex + 7} total={quizData.length} />
    </div>
  );
}