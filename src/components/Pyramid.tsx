import React, { forwardRef } from "react";

const Pyramid = forwardRef<HTMLDivElement>((props, ref) => {
  const items = [
    {
      text: "💯여자친구 마음 읽기 마스터",
      targetId: "section-1",
      style: {
        fontSize: "30px",
        top: "26px",
        left: "-33px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "텔레파시 통하는 완벽 남친💘",
      targetId: "section-2",
      style: {
        fontSize: "30px",
        top: "26px",
        left: "541px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "🕶️눈치 백단 남친",
      targetId: "section-3",
      style: {
        fontSize: "30px",
        top: "142px",
        left: "40px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "귀신같은 눈치남!👻",
      targetId: "section-4",
      style: {
        fontSize: "30px",
        top: "142px",
        left: "615px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "📚센스 업그레이드형 남친",
      targetId: "section-5",
      style: {
        fontSize: "30px",
        top: "284px",
        left: "-158px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "센스 업그레이드 진행 중인 남친🛠️",
      targetId: "section-6",
      style: {
        fontSize: "30px",
        top: "284px",
        left: "708px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "💬나름 노력파 남친",
      targetId: "section-7",
      style: {
        fontSize: "30px",
        top: "414px",
        left: "-158px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "연애 초보 탐험가 남친🤔",
      targetId: "section-8",
      style: {
        fontSize: "30px",
        top: "414px",
        left: "788px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "😅 감 잡는 중인 남친",
      targetId: "section-9",
      style: {
        fontSize: "30px",
        top: "548px",
        left: "-260px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "감 잡아야 하는 남친🚨",
      targetId: "section-10",
      style: {
        fontSize: "30px",
        top: "548px",
        left: "874px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
  ];

  const handleClick = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      const offset = 150;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.currentTarget.style.textDecoration = "underline";
    e.currentTarget.style.textDecorationColor = "#E10CA1";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.currentTarget.style.textDecoration = "none";
  };

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "800px",
        height: "836px",
        margin: "0 auto",
      }}
    >
      <img
        src="/images/pyramid.png"
        alt="Pyramid"
        style={{
          width: "872px",
          height: "669px",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
      {items.map((item, index) => (
        <p
          key={index}
          onClick={() => handleClick(item.targetId)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "absolute",
            margin: 0,
            zIndex: 1,
            whiteSpace: "nowrap",
            ...(item.style || {}),
          }}
        >
          {item.text}
        </p>
      ))}
    </div>
  );
});

export default Pyramid;