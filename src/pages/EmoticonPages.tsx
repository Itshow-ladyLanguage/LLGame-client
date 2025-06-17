import { useNavigate } from "react-router-dom";
import Emoticon from "../components/Emoticon";
import Pyramid from "../components/Pyramid";
import { useEffect, useState } from "react";

function FixedHeaderPage(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setTimeout(() => {
      navigate("/RankingPages");
    }, 1000);
  };

  return (
    <div>
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
          justifyContent: "space-between",
          alignItems: "center",
          transition: "all 0.3s ease",
          paddingTop: scrolled ? "0px" : "55px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginLeft: "141px",
          }}
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
            랭킹화면으로 돌아가기
          </p>
        </div>
      </header>

      <div style={{ marginTop: "630px", marginBottom: "1000px", }}>
        <Pyramid />
      </div>

      {/* 📍 여기로 스크롤 이동되게 할 것 */}
      <div
        id="emoticon-section"
        style={{
          marginTop: "200px",
          padding: "50px",
        }}
      >
        <Emoticon />
      </div>
    </div>
  );
}

export default FixedHeaderPage;
