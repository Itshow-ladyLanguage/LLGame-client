import Timer from "../components/Timer";
import Bar from "../components/Bar";
import Subjective from "../components/Subjective";
import SubjectiveText from "../components/SuQuzeText";

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
      <div style={{ marginBottom: "28px" }}>
        <Bar />
      </div>
      <div style={{ marginTop: "0px" }}>
        <Subjective />
      </div>
      <div style={{ margin: "36px"}}>
        <SubjectiveText/>
      </div>
      <div style={{ marginTop: "48px" }}>
        <Timer />
      </div>
    </div>
  );
}
