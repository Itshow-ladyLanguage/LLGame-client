import { useEffect } from 'react';
import Bar from '../components/Bar';
import Timer from '../components/Timer';
import OXPuiz from '../components/OXQuiz'
import OXPuizButton from '../components/OXPuizButton'

export default function OXQuizPages() {
  useEffect(() => {
    document.body.style.margin = '0';
  }, []);

  return (
    <div style={{
      marginTop: "96px",
      display: "flex",
      flexDirection: "column", // Vertical layout
      alignItems: "center",    // Center horizontally
    }}>
      <div style={{ marginBottom: "28px" }}>
        <Bar />
      </div>
      <OXPuiz/>
      <div style={{marginTop:"87.5px"}}>
        <OXPuizButton/>
      </div>
      <div style={{marginTop:"83.5px"}}>
        <Timer />
      </div>
    </div>
  );
}
