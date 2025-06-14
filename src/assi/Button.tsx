import { useEffect, useState } from "react";

type ButtonProps = {
  label: string;
  score: number;  // 점수 받기
  labelColor?: string;
  hoverLabelColor?: string;
  onClick?: (score: number) => void; // 클릭 시 점수를 전달
};

export default function Button({
  label,
  score,
  labelColor = "#000",
  hoverLabelColor = "#fff",
  onClick,
}: ButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      setTimeout(() => {
        if (onClick) onClick(score); // 점수를 전달
      }, 800);
    }
  };

  return (
    <div style={{ perspective: "1000px", width: "693px", height: "130.5px" }}>
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: isClicked ? "rotateY(180deg)" : "none",
          transition: "transform 0.8s ease",
          cursor: isClicked ? "default" : "pointer",
          borderRadius: "35px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: isHovered && !isClicked ? "#E10CA1" : "#F4F4F4",
            borderRadius: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "36px",
            color: isHovered && !isClicked ? hoverLabelColor : labelColor,
            transition: "all 0.3s ease",
          }}
        >
          {label}
        </div>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: "#E10CA1",
            borderRadius: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "36px",
            color: hoverLabelColor,
            transform: "rotateY(180deg)",
          }}
        >
          +{score}
        </div>
      </div>
    </div>
  );
}
