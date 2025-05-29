import { useState } from "react";

interface CoverButtonDesignProps {
  label: string;
  onClick?: () => void;
  labelColor?: string;
  hoverLabelColor?: string;
}

// Button 컴포넌트 정의 (props로 label, labelColor, hoverLabelColor 등을 받음)
export default function CoverButtonDesign(props: any) {
  // isHovered 상태: 마우스가 버튼 위에 올라갔는지 여부를 저장
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={props.onClick}
      // 버튼 스타일 정의
      style={{
        width: "1416px", // 버튼 너비
        height: "142px", // 버튼 높이
        backgroundColor: isHovered ? "#FBB8D4" : "#F7F7F7", // 호버 시 배경색 변경
        fontSize: "48px", // 텍스트 크기
        border: "3px solid #82005B",
        borderRadius: "30px", // 모서리 둥글게
        cursor: "pointer", // 마우스 오버 시 포인터로 변경
      }}
      // 마우스를 버튼 위에 올렸을 때 isHovered를 true로 설정
      onMouseEnter={() => setIsHovered(true)}
      // 마우스를 버튼에서 뗐을 때 isHovered를 false로 설정
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        // 버튼 안의 텍스트 스타일 정의
        style={{
          textDecoration: "none", // 밑줄 제거
          color: isHovered
            ? props.hoverLabelColor || "#000000" // 호버 시 텍스트 색상 변경
            : props.labelColor || "#000000", // 기본 텍스트 색상
        }}
      >
        {props.label} {/* 버튼에 표시할 텍스트 */}
      </span>
    </button>
  );
}
