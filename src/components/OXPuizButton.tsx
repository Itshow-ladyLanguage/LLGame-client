import React, { useEffect, useState } from "react";
import OXPuizButtonDesign from "../assi/OXPuizButtonDesign";

export default function OXQuizButton({
  answer,
  scoreArray,
  onAnswered,
  clicked,
  setClicked,
  resetTrigger,
}: {
  answer: string[];        // ["O", "X"]
  scoreArray: number[];    // [4, 0] or [0, 4]
  onAnswered: (score: number) => void;
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

      const score = scoreArray[index]; // 해당 선택의 점수 가져오기
      setScoreToShow(score);
      onAnswered(score);
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