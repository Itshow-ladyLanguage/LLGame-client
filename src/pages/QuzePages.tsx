import { useEffect } from "react";
import Quzelook from "../components/Quzelook";
import Bar from "../components/Bar";
import QuzeButton from "../components/QuzeButton";
import Timer from "../components/Timer";
import PageNumber from "../components/PageNumber";

export default function RankingPages() {
  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <div
      style={{
        marginTop: "96px",
        display: "flex",
        flexDirection: "column", // Vertical layout
        alignItems: "center", // Center horizontally
      }}
    >
      <div style={{ marginBottom: "28px" }}>
        <Bar />
      </div>
      <Quzelook />
      <div style={{ marginTop: "87.5px" }}>
        <QuzeButton />
      </div>
      <div style={{ marginTop: "63.5px" }}>
        <PageNumber />
      </div>
    </div>
  );
}
