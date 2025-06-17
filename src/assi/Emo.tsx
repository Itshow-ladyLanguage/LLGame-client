import { useEffect } from "react";

interface EmoProps {
  typetitle: string;
  typesubtitle: string;
  imgemo: string;
  numbersign: string;
  typedis: string;
}

export default function Emo(props: EmoProps) {
  useEffect(() => {
    document.body.style.margin = "0"; // 브라우저 기본 마진 제거
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "35px", margin: "0", marginBottom: "20px" }}>
          {props.typetitle}
        </p>
        <p
          style={{
            fontSize: "30px",
            color: "#4E4E4E",
            margin: "0",
            marginBottom: "60px",
          }}
        >
          {props.typesubtitle}
        </p>
        <img
          src={props.imgemo}
          alt="emoticon"
          style={{
            width: "380px",
            height: "380px",
            margin: "0",
            marginBottom: "30px",
          }}
        />
        <p
          style={{
            fontSize: "27px",
            color: "#E10CA1",
            margin: "0",
            marginBottom: "12px",
          }}
        >
          {props.numbersign}
        </p>
        <p
          style={{
            fontSize: "28px",
            color: "#4E4E4E",
            margin: "0",
            whiteSpace: "pre-line",
            lineHeight: "1.2" /* 또는 1.1, 1 등 */,
          }}
        >
          {props.typedis}
        </p>
      </div>
    </div>
  );
}
