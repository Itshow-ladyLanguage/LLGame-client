import { useState } from "react";

export default function CoverButtonDesign(props: {
  label: string;
  onClick: () => void;
  labelColor?: string;
  hoverLabelColor?: string;
  hoverbackcolor?: string;
  backcolor?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={props.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "420px",
        height: "86px",
        borderRadius: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: isHovered ? props.hoverLabelColor : props.labelColor,
        backgroundColor: isHovered ? props.hoverbackcolor : props.backcolor,
        fontSize: "20px",
        border: "18.09px",
      }}
    >
      {props.label}
    </div>
  );
}
