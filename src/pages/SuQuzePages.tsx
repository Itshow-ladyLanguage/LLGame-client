import Timer from "../components/Timer";
import Bar from "../components/Bar";
import SubjectiveText from "../components/SubjectiveText"
import Subjective from "../components/Subjective";

export default function SuQuzePages() {
  return (
    <div
      style={{
        marginTop: "96px",
        display: "flex",
        flexDirection: "column", // Vertical layout
        alignItems: "center", // Center horizontally
      }}
    >
      <div style={{ marginBottom: "74px" }}>
        <Bar />
      </div>

      <div style={{ marginTop: "0px" }}>
        <Subjective />
      </div>
      <div style={{ margin: "36px"}}>
        <SubjectiveText />
      </div>
      <div style={{ marginTop: "83.5px" }}>
        <Timer />
      </div>
    </div>
  );
}
