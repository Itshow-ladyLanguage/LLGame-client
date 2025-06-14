type TimerProps = {
  timeLeft: number;
};

export default function Timer({ timeLeft }: TimerProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
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
        {timeLeft}
      </span>
    </div>
  );
}
