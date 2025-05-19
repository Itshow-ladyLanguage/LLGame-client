// export default function Bar() { 
//   return (
//     <div style={{
//       width: "1579.5px",
//       height: "15px",
//       backgroundColor: "#F4F4F4",
//     }}>
      
//     </div>
//   );
// }

import { useState } from "react";

// 게이지바 컴포넌트 정의


export default function Bar() {
  const totalSteps = 12;
  const totalWidth = 1579.5;
  const stepWidth = totalWidth / totalSteps;
  const [progress] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      <div
        style={{
          width: `${totalWidth}px`,
          height: "15px",
          backgroundColor: "#F4F4F4",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress * stepWidth}px`,
            height: "100%",
            backgroundColor: "#E10CA1",
            borderTopRightRadius:"8px",
            borderBottomRightRadius:"8px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <div style={{ fontSize: "33px", color:"#777777", marginTop: "2px", marginLeft:"11px" }}>
        {currentPage}/{totalPages}
        {/* <button onClick={handleNextPage}>다음 페이지</button> */}
      </div>
    </div>
  );
}
