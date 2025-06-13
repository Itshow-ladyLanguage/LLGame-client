import QuzeContainer from "../components/QuzeContainer";
import Bar from "../components/Bar";
import Timer from "../components/Timer";
import PageNumber from "../components/PageNumber";
import { useEffect } from "react";

export default function QuzePages() {
  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <div
      style={{
        marginTop: "96px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "28px" }}>
        <Bar />
      </div>
      <QuzeContainer />
      <div style={{ marginTop: "63.5px" }}>
        <PageNumber />
      </div>
    </div>
  );
}
