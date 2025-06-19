import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import Bar from "../components/Bar";
import PageNumber from "../components/PageNumber";
import SuQuzeText from "../components/SuQuzeText";
import Subjective from "../components/Subjective";

type SuQuizType = {
  id?: string; // id 필드 추가 (옵셔널)
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

  // 이전 페이지에서 받은 점수 처리
  const initialScore = Number(location.state?.initialScore ?? 0);
  const [totalScore, setTotalScore] = useState<number>(initialScore);

  // 디버깅용: 전달받은 초기 점수 로그
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
      // 모든 주관식 퀴즈 완료 - 결과 페이지로 이동하며 최종 점수 전달
      console.log("주관식 퀴즈 완료 - 최종 누적 점수:", totalScore);
      navigate("/ResultPages", {
        state: {
          finalScore: totalScore,
        },
      });
    }
  };

  // SuQuzeText에서 점수를 받아와서 누적하는 함수 (시간 보너스 제거)
  const handleAnswered = (receivedScore: number) => {
    setTotalScore((prev) => {
      const newTotal = prev + receivedScore;
      console.log("API 점수:", receivedScore, "누적 점수:", newTotal);
      return newTotal;
    });

    // 다음 문제로 이동
    setTimeout(() => {
      goToNextQuestion();
    }, 1000); // SuQuzeText에서 이미 3초 + 1초 대기하므로 추가 대기 없이 바로 이동
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

  // 현재 퀴즈 가져오기
  const currentQuiz = quizData[currentIndex];

  return (
    <div
      style={{
        marginTop: "96px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: "0.7",
      }}
    >
      <div style={{ marginBottom: "35px" }}>
        <Bar timeLeft={timeLeft} />
      </div>
      <Subjective question={currentQuiz.question} />
      <div style={{ marginTop: "87.5px" }}>
        <SuQuzeText
          onAnswered={handleAnswered} // 점수를 파라미터로 받는 함수로 변경
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
