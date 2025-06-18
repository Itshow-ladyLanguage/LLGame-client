import { useEffect, useState } from "react";
import Ranking from "../components/Ranking";
import { useNavigate } from "react-router-dom";

export default function RankingPages() {
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

  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // body margin 제거
    document.body.style.margin = "0";

    // 페이지 진입 시 스크롤을 맨 위로 초기화
    window.scrollTo(0, 0);

    // 스크롤 이벤트 리스너 추가
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackClick = () => {
    navigate("/CoverPages");
  };

  return (
    <div>
      {/* 고정 헤더 */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          height: "150px",
          zIndex: 999,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          transition: "all 0.3s ease",
          paddingTop: scrolled ? "0px" : "55px",
          boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginLeft: "141px",
            cursor: "pointer",
          }}
          onClick={handleBackClick}
        >
          <img
            src="/images/arrow.png"
            alt="뒤로 가기"
            style={{
              width: "40px",
              height: "37.66px",
              marginTop: "3px",
              transition: "margin-top 0.3s ease",
            }}
          />
          <p style={{ fontSize: "38px", margin: "0px" }}>
            시작화면으로 돌아가기
          </p>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "250px", // 헤더 높이만큼 여백 추가
          marginBottom: "100px",
        }}
      >
        <Ranking />
      </div>
    </div>
  );
}
