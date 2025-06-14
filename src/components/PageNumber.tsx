export default function PageNumber(props: { current: number; total: number }) {
  return (
    <div>
      <p style={{ fontSize: "31px", color: "#777777" }}>
        {props.current} / 12
      </p>
    </div>
  );
}
