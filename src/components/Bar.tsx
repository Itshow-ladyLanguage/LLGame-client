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
import Timer from "./Timer";
import { useEffect, useState } from "react";

export default function Bar() {
  const totalWidth = 1579.5;
  const totalTime = 60;
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const progressWidth = (timeLeft / totalTime) * totalWidth;

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
            width: `${progressWidth}px`,
            height: "100%",
            backgroundColor: "#E10CA1",
            borderTopRightRadius: timeLeft === 0 ? "0px" : "8px",
            borderBottomRightRadius: timeLeft === 0 ? "0px" : "8px",
            transition: "width 1s linear",
          }}
        />
      </div>
      <div
        style={{
          fontSize: "33px",
          color: "#777777",
          marginTop: "2px",
          marginLeft: "11px",
        }}
      >
        <Timer />
      </div>
    </div>
  );
}
