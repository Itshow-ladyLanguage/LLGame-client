import { useEffect, useState } from 'react';
import axios from 'axios';
import Bar from '../components/Bar';
import OXQuiz from '../components/OXQuiz';
import OXQuizButton from '../components/OXPuizButton';
import { useNavigate } from 'react-router-dom';
import PageNumber from "../components/PageNumber";

type OXQuizType = {
  type: string;
  question: string;
  answer: string;
  score: number;
};

export default function OXQuizPages() {
  const [quizData, setQuizData] = useState<OXQuizType[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/quiz/ox`
        );
        setQuizData(res.data);
      } catch (error) {
        console.error('퀴즈 데이터 불러오기 실패:', error);
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
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 문제 끝났을 때 이동
      navigate("/SuQuzePages"); // 원하시는 경로로 변경하세요
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
      <OXQuiz question={quizData[currentIndex].question} />
      <div style={{ marginTop: "87.5px" }}>
        <OXQuizButton
          answer={quizData[currentIndex].answer}
          onAnswered={goToNextQuestion}
          clicked={clicked}
          setClicked={setClicked}
        />
      </div>
      <PageNumber current={currentIndex + 1} total={quizData.length} />
    </div>
  );
}
