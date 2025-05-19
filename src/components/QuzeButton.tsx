import Button from "../assi/Button";

export default function QuzeButton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "57px" }}>
      <div style={{ display: "flex", gap: "26px" }}>
        <div style={{ marginRight: "10px" }}>
          <Button label="나 아이스크림 먹고싶어" />
        </div>
        <div>
          <Button label="빨리 내 마음 읽고 먹던거 사와라" />
        </div>
      </div>

      <div style={{ display: "flex", gap: "26px" }}>
        <div style={{ marginRight: "10px" }}>
          <Button label="우리 자기가 먹고 싶겠징?" />
        </div>
        <div>
          <Button label="혼자 먹으면 돼지 같으니까 같이 먹자" />
        </div>
      </div>
    </div>
  );
}
