import Button from "../assi/Button";

type Props = {
  answers: {
    type: string;
    question: string;
    answer: string[];
    score: number[] | number | string;
  }[];
};

export default function QuzeButton({ answers = [] }: Props) {
  if (answers.length === 0) return null; // 데이터 없으면 아무것도 안 렌더링

  const firstQuiz = answers[0]; // 첫 번째 퀴즈만 사용

  // answer 배열을 2개씩 묶어서 렌더링 준비
  const groupedAnswers = firstQuiz.answer.reduce<string[][]>((acc, curr, i) => {
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
              <Button label={label} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
