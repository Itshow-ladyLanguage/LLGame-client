import { useEffect, useState } from 'react';
import Bar from '../components/Bar';
import Timer from '../components/Timer';
import OXPuiz from '../components/OXQuiz';
import OXPuizButton from '../components/OXPuizButton';

export default function OXQuizPages() {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    document.body.style.margin = '0';

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      marginTop: "96px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <div style={{ marginBottom: "28px" }}>
        <Bar timeLeft={timeLeft} />
      </div>
      <OXPuiz />
      <div style={{ marginTop: "87.5px" }}>
        <OXPuizButton />
      </div>
      <div style={{ marginTop: "83.5px" }}>
        <Timer timeLeft={timeLeft} />
      </div>
    </div>
  );
}
