import { useEffect } from "react";
import CoverButton from "../components/CoverButton";

export default function CoverPages() {
  document.body.style.margin = "0";
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

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div>
       <div style={{ position: "relative", width: "1920px", height: "556px", margin: "0 auto" }}>
  {/* cloud 이미지 (배경) */}
  <img
    src="/Cover/cloud.png"
    alt="클라우드 배경"
    style={{
      width: "1920px",
      height: "100%",
      position: "absolute",
      top: "94%",
      left: 0,
      zIndex: 1,
    }}
  />

  {/* llgame 이미지 (겹쳐진 이미지) */}
  <img
    src="/Cover/llgame.png"
    alt="llgame 이미지"
    style={{
      width: "908px",
      height: "556px",
      position: "absolute",
      top: "33%",
      left: "506px",
      zIndex: 2,
    }}
  />

  {/* CoverButton - 가운데 정렬 + cloud 위에 배치 */}
  <div
    style={{
      position: "absolute",
      top: "131%", // 원하는 위치 조정
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 3, // cloud 위
    }}
  >
    <div>
        <img
          src="/Cover/shine1.png"
          alt="카메라 아이콘"
          style={{
          width: "200px",
          height: "84px",
           position: "absolute",
           bottom:"420%", // 원하는 위치 조정
          //  left: "100%",
           right:"117%"
            }}
            
          />
      </div>
      <div>
        <img
          src="/Cover/planet2.png"
          alt="카메라 아이콘"
          style={{
          width: "214px",
          height: "184px",
           position: "absolute",
           bottom:"84%", // 원하는 위치 조정
          //  left: "100%",
           right:"108%"
            }}
            
          />
      </div>
       <div>
        <img
          src="/Cover/planet1.png"
          alt="카메라 아이콘"
          style={{
          width: "250px",
          height: "149px",
           position: "absolute",
           bottom:"368%", // 원하는 위치 조정
           left: "108%",
          //  right:"108%"
            }}
            
          />
      </div>
      <div>
        <img
          src="/Cover/shine2.png"
          alt="카메라 아이콘"
          style={{
          width: "175px",
          height: "98px",
          position: "absolute",
          bottom:"206%", // 원하는 위치 조정
          left: "98%",
          //  right:"108%"
            }}
            
          />
      </div>

      
    <CoverButton />
  </div>
   <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{
              position: "absolute",
              marginTop: "35px",
              marginLeft: "1550px",
              color: "#E10CA1",
              fontSize: "28.95px",
            }}
          >
            IT SHOW
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              backgroundColor: "#E10CA1",
              width: "1700px",
              height: "3px",
              marginTop: "85px",
            }}
          />
        </div>
        </div>
        <div>
        <img
          src="/Cover/shine1.png"
          alt="카메라 아이콘"
          style={{
          width: "175px",
          height: "98px",
           left: "81%",
           position: "relative",
           top:"160px"
            }}
            
          />
      </div>
        
    </div>
  );
}