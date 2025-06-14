import React, { useEffect, useState } from "react";
import OXPuizButtonDesign from "../assi/OXPuizButtonDesign";

export default function OXQuizButton({
  answer,
  onAnswered,
  clicked,
  setClicked,
  resetTrigger,
}: {
  answer: string;
  onAnswered: () => void;
  clicked: boolean;
  setClicked: (v: boolean) => void;
  resetTrigger: number;
}) {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    if (!clicked) {
      setClicked(true);
      setClickedIndex(index);
      setTimeout(() => {
        onAnswered();
      }, 800);
    }
  };

  useEffect(() => {
    setClickedIndex(null);
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
        />
        <OXPuizButtonDesign
          key={`x-button-${resetTrigger}`}
          label="X"
          onClick={() => handleButtonClick(1)}
          isClicked={clickedIndex === 1}
          isAnyClicked={clicked}
          labelColor="#000"
          hoverLabelColor="#fff"
        />
      </div>
    </div>
  );
}
