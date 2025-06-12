import { useNavigate } from "react-router-dom";
import CoverButtonDesign from "../assi/CoverButtonDesign";

export default function CoverButton() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "14px",
        }}
      >
        <CoverButtonDesign
          label="시작"
          onClick={() => navigate("/Login")}
          labelColor="#000000"
          hoverLabelColor="#FFFFFF"
          hoverbackcolor="#E10CA1"
          backcolor="#EEEEEE"
        />
        <CoverButtonDesign
          label="랭킹"
          onClick={() => navigate("/RankingPages")}
          labelColor="#000000"
          hoverLabelColor="#FFFFFF"
          hoverbackcolor="#E10CA1"
          backcolor="#EEEEEE"
        />
      </div>
    </div>
  );
}
