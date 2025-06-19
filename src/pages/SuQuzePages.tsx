import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import Bar from "../components/Bar";
import PageNumber from "../components/PageNumber";
import SuQuzeText from "../components/SuQuzeText";
import Subjective from "../components/Subjective";

type SuQuizType = {
  id?: string;
  type: string;
  question: string;
  answer: string;
  score: number;
};

export default function SuQuizPages() {
  const [quizData, setQuizData] = useState<SuQuizType[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [resetTrigger, setResetTrigger] = useState(0);

  // 줌 방지 기능
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        (e.keyCode === 61 ||
          e.keyCode === 107 ||
          e.keyCode === 173 ||
          e.keyCode === 109 ||
          e.keyCode === 187 ||
          e.keyCode === 189 ||
          e.keyCode === 48)
      ) {
        e.preventDefault();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // 점수 초기화
  const initialScore = Number(location.state?.initialScore ?? 0);
  const [totalScore, setTotalScore] = useState<number>(initialScore);

  useEffect(() => {
    console.log("SuQuizPages 시작 - 전달받은 초기 점수:", initialScore);
    console.log("location.state:", location.state);
  }, []);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/quiz/short`
        );
        setQuizData(res.data);
        console.log("주관식 퀴즈 데이터 로드 완료:", res.data.length, "개");
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
      console.log("주관식 퀴즈 완료 - 최종 누적 점수:", totalScore);
      navigate("/ResultPages", {
        state: {
          finalScore: totalScore,
        },
      });
    }
  };

  const handleAnswered = (receivedScore: number) => {
    setTotalScore((prev) => {
      const newTotal = prev + receivedScore;
      console.log("API 점수:", receivedScore, "누적 점수:", newTotal);
      return newTotal;
    });

    setTimeout(() => {
      goToNextQuestion();
    }, 1000);
  };

  if (quizData.length === 0) {
    return (
      <div
        style={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 퀴즈 데이터를 불러오는 중... */}
      </div>
    );
  }

  const currentQuiz = quizData[currentIndex];

  return (
    <div
      style={{
        marginTop: "96px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: "1.0",
      }}
    >
      <div style={{ marginBottom: "35px" }}>
        <Bar timeLeft={timeLeft} />
      </div>

        <Subjective question={currentQuiz.question} />

        <div style={{ marginTop: "30px" }}>
          {currentQuiz.question === "Q 다음 대화에서 여자가 화난 이유는?" && (
            <img
              src="/images/talk.png"
              alt="대화 이미지"
              style={{
                width: "300px",
                borderRadius: "8px",
              }}
            />
          )}
        </div>

        <div style={{ marginTop: "30px" }}>
          <SuQuzeText
            onAnswered={handleAnswered}
            clicked={clicked}
            setClicked={setClicked}
            resetTrigger={resetTrigger}
            quizId={currentQuiz?.id || `quiz-${currentIndex}`}
          />
        </div>


      <div style={{ marginTop: "35px" }}>
        <PageNumber current={currentIndex + 10} total={quizData.length} />
      </div>
    </div>
  );
}
