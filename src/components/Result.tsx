import { useEffect, useState, useRef } from "react";

export default function ResultPages() {
  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [hoveredBtn, setHoveredBtn] = useState<null | "rank" | "explain">(null);

  // 버튼 외부 클릭 시 팝업 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    }

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  // 버튼 클릭 시 토글만 발생
  function handleTogglePopup() {
    setIsPopupOpen((prev) => !prev);
  }

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
          <button
            onMouseEnter={() => setHoveredBtn("rank")}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{
              width: "204px",
              height: "71px",
              fontSize: "33px",
              borderRadius: "15px",
              border: "none",
              cursor: "pointer",
              backgroundColor: hoveredBtn === "rank" ? "#E10CA1" : "ECECEC",
              color: hoveredBtn === "rank" ? "#ffffff" : "#E10CA1",
            }}
          >
            랭킹 화면
          </button>

          <button
            onMouseEnter={() => setHoveredBtn("explain")}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{
              width: "204px",
              height: "71px",
              fontSize: "33px",
              borderRadius: "15px",
              border: "none",
              cursor: "pointer",
              position: "relative",
              zIndex: 10,
              backgroundColor: hoveredBtn === "explain" ? "#E10CA1" : "ECECEC",
              color: hoveredBtn === "explain" ? "white" : "#E10CA1",
            }}
            onClick={handleTogglePopup}
          >
            게임 해설
          </button>

          {isPopupOpen && (
            <div
              ref={popupRef}
              style={{
                position: "absolute",
                top: "-130px", // 위아래 조절 가능
                left: "110%",
                width: "180px",
                backgroundColor: "white",
                border: "2px solid #E10CA1",
                borderRadius: "15px",
                padding: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src="/images/Qr.png"
                alt="게임 해설 QR 코드"
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
