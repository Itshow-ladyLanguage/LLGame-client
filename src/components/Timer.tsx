import { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) return; // 시간 다 되면면 멈추는 코드

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000); // 1초마다 감소

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 정리
  }, [seconds]);

  return (
    <div
      style={{
        display: "flex",
        gap: "8px", // 두 타이머 사이 간격
        marginTop: "8px",
        marginLeft: "5px",
      }}
    >
      <img
        src="/images/clock.png"
        alt="Clock Icon"
        style={{ height: "37.66px", width: "37.66px", marginTop: "4px" }}
      />
      <span style={{ fontSize: "31px", fontWeight: "bold", color: "#777777" }}>
        {seconds}
      </span>
    </div>
  );
}
