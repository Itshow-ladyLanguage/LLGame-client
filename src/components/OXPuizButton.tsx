import React, { useState } from "react";
import OXPuizButtonDesign from "../assi/OXPuizButtonDesign";

export default function OXQuizButton() {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    if (clickedIndex === null) {
      setClickedIndex(index);
    }
  };

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
          label="O"
          onClick={() => handleButtonClick(0)}
          isClicked={clickedIndex === 0}
          isAnyClicked={clickedIndex !== null}
          labelColor="#000"
          hoverLabelColor="#fff"
        />
        <OXPuizButtonDesign
          label="X"
          onClick={() => handleButtonClick(1)}
          isClicked={clickedIndex === 1}
          isAnyClicked={clickedIndex !== null}
          labelColor="#000"
          hoverLabelColor="#fff"
        />
      </div>
    </div>
  );
}
