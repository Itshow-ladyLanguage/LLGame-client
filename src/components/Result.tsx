import { useEffect, useState } from "react";

export default function ResultPages() {
  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  const [isRankHovered, setIsRankHovered] = useState(false);
  const [isExplainHovered, setIsExplainHovered] = useState(false);
  const [isExplainClicked, setIsExplainClicked] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "1446px",
          height: "823.5px",
          border: "4.5px solid #E10CA1",
          borderRadius: "51px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <p style={{ color: "#E10CA1", fontSize: "36px", margin: "0px" }}>
          당신의 여자어 실력은?
        </p>
        <p
          style={{
            fontSize: "45px",
            textAlign: "center",
            marginBottom: "45px",
          }}
        >
          💯"여자친구 마음 읽기 마스터"💯 <br />
          <strong>센스 만렙</strong>
        </p>
        <img
          src="/images/img.png"
          alt="Profile"
          style={{
            width: "180px",
            height: "180px",
            marginBottom: "36px",
          }}
        />
        <p style={{ fontSize: "33px", margin: "0px" }}>순위 : 1등</p>
        <p style={{ fontSize: "33px", margin: "0px" }}>점수 : 45점</p>

        <div
          style={{
            marginTop: "50px",
            display: "flex",
            gap: "24px",
            position: "relative",
          }}
        >
          {/* 랭킹 화면 버튼 */}
          <button
            style={{
              width: "204px",
              height: "71px",
              fontSize: "33px",
              borderRadius: "15px",
              border: "none",
              color: isRankHovered ? "#ffffff" : "#E10CA1",
              backgroundColor: isRankHovered ? "#E10CA1" : "#ECECEC",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsRankHovered(true)}
            onMouseLeave={() => setIsRankHovered(false)}
          >
            랭킹 화면
          </button>

          {/* 게임 해설 버튼 */}
          <button
            style={{
              width: "204px",
              height: "71px",
              fontSize: "33px",
              borderRadius: "15px",
              border: "none",
              color:
                isExplainHovered || isExplainClicked ? "#ffffff" : "#E10CA1",
              backgroundColor:
                isExplainHovered || isExplainClicked ? "#E10CA1" : "#ECECEC",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsExplainHovered(true)}
            onMouseLeave={() => setIsExplainHovered(false)}
            onClick={() => setIsExplainClicked((prev) => !prev)} // toggle
          >
            게임 해설
          </button>
        </div>

        {/* 게임 해설 이미지 토글 */}
        {isExplainClicked && (
          <img
            src="/images/Qr.png"
            alt="게임 해설 이미지"
            style={{
              position: "absolute",
              left: "60%", // 버튼 오른쪽
              top: "55%",
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "12px",
              border: "2px solid #E10CA1",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
        )}
      </div>
    </div>
  );
}
