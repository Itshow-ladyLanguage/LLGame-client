import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RankingFrofile from "../assi/RankingProfile";

export default function Ranking(props: any) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Emo");
  };

  return (
    <div>
      <div
        style={{
          width: "1300px",
          minHeight: "284px",
          backgroundColor: "#E10CA1",
          borderRadius: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          style={{
            marginTop: "101px",
            width: "1087px",
            height: "120px",
            border: "3px solid #7a1d36",
            borderTopLeftRadius: "25px",
            borderTopRightRadius: "25px",
            marginBottom: "21px",
            backgroundColor: isHovered ? "#F3B7FF" : "#FFCEF0",
            cursor: "pointer",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <p
            style={{
              fontSize: "33px",
              color: "#5C0F24",
              margin: 0,
            }}
          >
            자신의 이모티콘 타입 설명 보기
          </p>
        </button>

        {/* 버튼 아래에 위치 */}
        <div style={{ marginBottom: "40px" }}>
          <RankingFrofile />
        </div>
      </div>
    </div>
  );
}
