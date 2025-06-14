import Timer from "./Timer";

type BarProps = {
  timeLeft: number;
};

export default function Bar({ timeLeft }: BarProps) {
  const totalWidth = 1579.5;
  const totalTime = 60;

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
        <Timer timeLeft={timeLeft} />
      </div>
    </div>
  );
}
