import Button from "../assi/Button";

type Props = {
  answers: string[];
  onAnswerClick: (answer: string) => void;
};

export default function QuzeButton({ answers = [], onAnswerClick }: Props) {
  if (answers.length === 0) return null;

  const groupedAnswers = answers.reduce<string[][]>((acc, curr, i) => {
    if (i % 2 === 0) acc.push([curr]);
    else acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "57px",
      }}
    >
      {groupedAnswers.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", gap: "26px" }}>
          {row.map((label, idx) => (
            <div
              key={idx}
              style={{ marginRight: idx === 0 ? "10px" : undefined }}
            >
              <Button label={label} onClick={() => onAnswerClick(label)} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
