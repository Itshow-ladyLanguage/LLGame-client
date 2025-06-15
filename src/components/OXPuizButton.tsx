import React, { useEffect, useState } from "react";
import OXPuizButtonDesign from "../assi/OXPuizButtonDesign";

export default function OXQuizButton({
  answer,
  onAnswered,
  clicked,
  setClicked,
  resetTrigger,
}: {
  answer: string; // "O" 또는 "X"
  onAnswered: () => void;
  clicked: boolean;
  setClicked: (v: boolean) => void;
  resetTrigger: number;
}) {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [scoreToShow, setScoreToShow] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    if (!clicked) {
      setClicked(true);
      setClickedIndex(index);

      // index 0 = O, index 1 = X
      const selected = index === 0 ? "O" : "X";

      // 정답 맞는지 확인해서 점수 세팅
      const score = selected === answer ? 4 : 0;
      setScoreToShow(score);

      setTimeout(() => {
        onAnswered();
        setScoreToShow(null); // 다음 문제 넘어갈 때 점수 초기화
      }, 800);
    }
  };

  useEffect(() => {
    setClickedIndex(null);
    setScoreToShow(null);
  }, [resetTrigger]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "23px",
        }}
      >
        <OXPuizButtonDesign
          key={`o-button-${resetTrigger}`}
          label="O"
          onClick={() => handleButtonClick(0)}
          isClicked={clickedIndex === 0}
          isAnyClicked={clicked}
          labelColor="#000"
          hoverLabelColor="#fff"
          scoreToShow={
            clickedIndex === 0 ? scoreToShow ?? undefined : undefined
          }
        />
        <OXPuizButtonDesign
          key={`x-button-${resetTrigger}`}
          label="X"
          onClick={() => handleButtonClick(1)}
          isClicked={clickedIndex === 1}
          isAnyClicked={clicked}
          labelColor="#000"
          hoverLabelColor="#fff"
          scoreToShow={
            clickedIndex === 1 ? scoreToShow ?? undefined : undefined
          }
        />
      </div>
    </div>
  );
}
