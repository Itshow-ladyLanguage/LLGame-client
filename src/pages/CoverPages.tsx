import { useEffect } from "react";
import CoverButton from "../components/CoverButton";

export default function CoverPages() {
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

  return (
    <div
      style={{
        position: "relative",
        height: "1080px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            position: "absolute",
            marginTop: "40px",
            marginLeft: "1550px",
            color: "#E10CA1",
            fontSize: "28.95px",
          }}
        >
          IT SHOW
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#E10CA1",
            width: "1700px",
            height: "3px",
            marginTop: "80px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: "30px",
        }}
      >
        <img
          src="/Cover/llgame.png"
          style={{
            width: "908px",
            height: "556px",
            marginTop: "60px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/Cover/shine1.png"
          style={{
            width: "200px",
            height: "84px",
            marginTop: "-480px",
            marginRight: "1400px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/Cover/planet1.png"
          style={{
            width: "250px",
            height: "149px",
            marginTop: "-450px",
            marginLeft: "1300px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/Cover/planet2.png"
          style={{
            width: "217px",
            height: "184px",
            marginTop: "-180px",
            marginRight: "1200px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/Cover/cloud.png"
          style={{
            width: "1920px",
            height: "610px",
            marginTop: "-220px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/Cover/shine2.png"
          style={{
            width: "175px",
            height: "98px",
            marginTop: "-520px",
            marginLeft: "1100px",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/Cover/shine1.png"
          style={{
            width: "200px",
            height: "84px",
            marginTop: "-320px",
            marginLeft: "1690px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-250px",
        }}
      >
        <CoverButton />
      </div>
    </div>
  );
}