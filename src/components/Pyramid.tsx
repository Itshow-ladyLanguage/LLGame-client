import React, { forwardRef } from "react";

const Pyramid = forwardRef<HTMLDivElement>((props, ref) => {
  const items = [
    {
      text: "💯여자친구 마음 읽기 마스터",
      targetId: "section-1",
      style: {
        fontSize: "35px",
        top: "20px",
        left: "-10px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "💘텔레파시 통하는 완벽 남친",
      targetId: "section-2",
      style: {
        fontSize: "35px",
        top: "55px",
        left: "690px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "🕶️눈치 백단 남친",
      targetId: "section-3",
      style: {
        fontSize: "35px",
        top: "145px",
        left: "80px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "🫣귀신같은 눈치남!",
      targetId: "section-4",
      style: {
        fontSize: "35px",
        top: "160px",
        left: "768px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "📚센스 업그레이드형 남친",
      targetId: "section-5",
      style: {
        fontSize: "35px",
        top: "309px",
        left: "-155px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "🛠️센스 업그레이드 진행 중인 남친",
      targetId: "section-6",
      style: {
        fontSize: "35px",
        top: "352px",
        left: "885px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "💬나름 노력파 남친",
      targetId: "section-7",
      style: {
        fontSize: "35px",
        top: "480px",
        left: "-165px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "🤔연애 초보 탐험가 남친",
      targetId: "section-8",
      style: {
        fontSize: "35px",
        top: "500px",
        left: "985px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "😅 감 잡는 중인 남친",
      targetId: "section-9",
      style: {
        fontSize: "35px",
        top: "650px",
        left: "-295px",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    {
      text: "🚨감 잡아야 하는 남친",
      targetId: "section-10",
      style: {
        fontSize: "35px",
        top: "675px",
        left: "1080px",
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

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "1090px",
        height: "836px",
        margin: "0 auto",
      }}
    >
      <img
        src="/images/pyramid.png"
        alt="Pyramid"
        style={{
          width: "100%",
          height: "100%",
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
