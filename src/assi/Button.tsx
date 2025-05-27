import { useState } from "react";

export default function Button(props: any) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!isClicked && !props.isAnyClicked) {
      setIsClicked(true);
      props.onClick(); // 부모에게 "나 클릭했어!" 알림
    }
  };

  return (
    <div
      style={{
        perspective: "1000px",
        width: "693px",
        height: "130.5px",
      }}
    >
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
          cursor: isClicked || props.isAnyClicked ? "default" : "pointer",
          borderRadius: "35px",
        }}
      >
        {/* 앞면 */}
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
            color:
              isHovered && !isClicked
                ? props.hoverLabelColor || "#ffffff"
                : props.labelColor || "#000000",
            transition: "all 0.3s ease",
          }}
        >
          {props.label}
        </div>

        {/* 뒷면 */}
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
            color: props.hoverLabelColor || "#ffffff",
            transform: "rotateY(180deg)",
          }}
        >
          +3
        </div>
      </div>
    </div>
  );
}
