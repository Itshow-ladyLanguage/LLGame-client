import { useEffect } from "react";
import Ranking from "../components/Ranking";
import { useNavigate } from "react-router-dom";

export default function RankingPages() {
  const navigate = useNavigate();
  // body margin 제거는 useEffect 안에서 한 번만 실행하는 걸 권장합니다
  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <div>
      <div
        style={{
          marginLeft: "141px",
          marginTop: "99px",
          marginBottom: "110px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
        <div onClick={() => navigate("/CoverPages")} style={{ cursor: "pointer" }}>
          <img src="/images/arrow.png"
            alt="뒤로 가기"
            style={{
              width: "40px",
              height: "37.66px",
              marginTop: "3px",
              cursor: "pointer",
            }} />
        </div>
          <p style={{ fontSize: "38px", margin: "0px" }}>
            시작화면으로 돌아가기
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Vertical layout
          alignItems: "center", // Center horizontally
          marginBottom: "100px",
        }}
      >
        <Ranking />
      </div>
    </div>
  );
}
