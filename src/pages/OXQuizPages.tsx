import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import Bar from "../components/Bar";
import OXQuiz from "../components/OXQuiz";
import OXQuizButton from "../components/OXPuizButton";
import PageNumber from "../components/PageNumber";

// OX 퀴즈 데이터의 타입 정의
type OXQuizType = {
  type: string; // 퀴즈 타입 (예: "ox")
  question: string; // 퀴즈 문제
  answer: string[]; // 정답 배열 (JSON 형태로 받아옴)
  score: number[]; // 점수 배열 (JSON 형태로 받아옴)
};

export default function OXQuizPages() {
  // 상태 변수들 선언
  const [quizData, setQuizData] = useState<OXQuizType[]>([]); // 서버에서 가져온 OX 퀴즈 데이터 배열
  const [timeLeft, setTimeLeft] = useState(60); // 각 문제당 남은 시간 (60초)
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 풀고 있는 문제의 인덱스
  const [clicked, setClicked] = useState(false); // 버튼 클릭 여부 (중복 클릭 방지용)
  const [resetTrigger, setResetTrigger] = useState(0); // 버튼 초기화를 위한 트리거

  // React Router 관련 훅들
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const location = useLocation(); // 현재 위치 정보와 이전 페이지에서 전달받은 데이터 접근

  // 이전 페이지(QuzeContainer)에서 전달받은 초기 점수 처리
  const initialScore = Number(location.state?.initialScore ?? 0); // 전달받은 점수가 없으면 0으로 초기화
  const [totalScore, setTotalScore] = useState<number>(initialScore); // 누적 점수 상태

  // 퀴즈 완료 체크를 위한 useEffect
  // currentIndex가 퀴즈 데이터 길이보다 크거나 같으면 모든 문제를 완료한 것으로 판단
  useEffect(() => {
    if (quizData.length > 0 && currentIndex >= quizData.length) {
      console.log("OX 퀴즈 완료 - 최종 누적 점수:", totalScore);
      // 다음 페이지(SuQuzePages)로 이동하며 누적 점수 전달
      navigate("/SuQuzePages", {
        state: {
          initialScore: totalScore,
        },
      });
    }
  }, [currentIndex, quizData.length, totalScore, navigate]);

  // 컴포넌트 마운트 시 서버에서 OX 퀴즈 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // 서버 API 호출하여 OX 퀴즈 데이터 가져오기
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/ox`);
        setQuizData(res.data); // 가져온 데이터를 상태에 저장
        console.log("OX 퀴즈 데이터 로드 완료:", res.data.length, "개");
      } catch (error) {
        console.error("퀴즈 데이터 불러오기 실패:", error);
      }
    };
    fetchQuizData();
  }, []); // 빈 배열이므로 컴포넌트 마운트 시 한 번만 실행

  // 디버깅용: 컴포넌트 시작 시 전달받은 초기 점수 로그 출력
  useEffect(() => {
    console.log("OXQuizPages 시작 - 전달받은 초기 점수:", initialScore);
    console.log("location.state:", location.state);
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 타이머 관리를 위한 useEffect
  // 현재 문제 인덱스가 변경될 때마다 새로운 타이머 시작
  useEffect(() => {
    // 퀴즈 데이터가 없거나 모든 문제를 완료한 경우 타이머 실행하지 않음
    if (currentIndex >= quizData.length || quizData.length === 0) return;

    // 1초마다 시간 감소시키는 타이머 설정
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // 시간이 다 떨어지면 자동으로 다음 문제로 이동
          goToNextQuestion();
          return 60; // 새로운 문제의 시간을 60초로 리셋
        }
        return prev - 1; // 1초씩 감소
      });
    }, 1000);

    // 컴포넌트 언마운트 또는 의존성 변경 시 타이머 정리
    return () => clearInterval(timer);
  }, [currentIndex, quizData.length]); // currentIndex나 quizData.length가 변경될 때마다 실행

  // 다음 문제로 이동하는 함수
  const goToNextQuestion = () => {
    setClicked(false); // 버튼 클릭 상태 초기화
    setTimeLeft(60); // 시간을 60초로 리셋
    setResetTrigger((prev) => prev + 1); // 버튼 컴포넌트 초기화를 위한 트리거 증가

    // 다음 문제 인덱스로 이동 (퀴즈 완료 체크는 위의 useEffect에서 수행)
    setCurrentIndex(currentIndex + 1);
  };

  // 로딩 상태 처리: 퀴즈 데이터가 아직 로드되지 않은 경우
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

  // 퀴즈 완료 상태 처리: 모든 문제를 다 푼 경우
  // (실제 페이지 이동은 위의 useEffect에서 처리됨)
  if (currentIndex >= quizData.length) {
    return (
      <div
        style={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 퀴즈 완료! 결과 페이지로 이동 중... */}
      </div>
    );
  }

  // 메인 렌더링: 정상적으로 퀴즈를 진행하는 화면
  return (
    <div
      style={{
        marginTop: "96px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 시간 바 컴포넌트 */}
      <div style={{ marginBottom: "35px" }}>
        <Bar timeLeft={timeLeft} />
      </div>

      {/* OX 퀴즈 문제 표시 컴포넌트 */}
      <OXQuiz question={quizData[currentIndex].question} />

      {/* OX 퀴즈 답변 버튼 컴포넌트 */}
      <div style={{ marginTop: "87.5px" }}>
        <OXQuizButton
          answer={quizData[currentIndex].answer} // 현재 문제의 정답 배열
          scoreArray={quizData[currentIndex].score} // 현재 문제의 점수 배열
          onAnswered={(score: number) => {
            // 답변을 선택했을 때 실행되는 콜백 함수
            // 점수 계산: 선택한 답의 점수 * 2 + 남은 시간
            const finalScore = score * 2 + timeLeft;
            setTotalScore((prev) => {
              const newTotal = prev + finalScore; // 계산된 최종 점수를 누적 점수에 더함
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
                newTotal
              );
              return newTotal;
            });
            // 0.8초 후 다음 문제로 이동 (사용자가 결과를 확인할 시간 제공)
            setTimeout(() => {
              goToNextQuestion();
            }, 800);
          }}
          clicked={clicked} // 중복 클릭 방지를 위한 상태
          setClicked={setClicked} // 클릭 상태 변경 함수
          resetTrigger={resetTrigger} // 버튼 초기화를 위한 트리거
        />
      </div>

      {/* 페이지 번호 표시 컴포넌트 */}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "35px",
        }}
      >
        <PageNumber
          current={currentIndex + 7} // 이전 QuizPages 6개 + 현재 OX 퀴즈 번호
          total={6 + quizData.length} // 전체 퀴즈 수 (이전 퀴즈 6개 + OX 퀴즈 개수)
        />
      </div>
    </div>
  );
}
