import { useEffect } from "react";
import Result from "../components/Result";

export default function ResultPages() {
  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "15px",
          background: "#E10CA1",
          marginTop: "96px",
          marginBottom: "60px",
        }}
      />

      <div>
        <Result />
      </div>
    </div>
  );
}
