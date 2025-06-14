import { useState } from "react";

export default function OXPuizButtonDesign(props: {
  label: string;
  onClick: () => void;
  isClicked: boolean;
  isAnyClicked: boolean;
  labelColor?: string;
  hoverLabelColor?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!props.isAnyClicked) {
      props.onClick(); // 클릭 안 된 상태에서만 반응
    }
  };

  return (
    <div
      style={{
        perspective: "1000px",
        width: "700px",
        height: "320px",
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
          transform: props.isClicked ? "rotateY(180deg)" : "none",
          transition: "transform 0.8s ease",
          cursor: props.isAnyClicked ? "default" : "pointer",
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
            backgroundColor:
              props.isClicked
                ? "#E10CA1"
                : isHovered && !props.isAnyClicked
                ? "#E10CA1"
                : "#F4F4F4",
            borderRadius: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "74px",
            fontWeight: 550,
            color:
              props.isClicked || (isHovered && !props.isAnyClicked)
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