import React from "react";
import "./Camera.css";

const Camera = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "98vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#E10CA1",
          padding: "20px",
          borderRadius: "72px",
          width: "892px",
          height: "612px",
          border: "3px solid #850E35",
        }}
      >
        <div
          className="btn-container">
          <button
          type="submit"
          className="button"
          style={{
            marginRight: "13px"
          }}>
            취소
          </button>
          <button
          type="submit"
          className="button"
          style={{
            marginRight: "10%"
          }}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default Camera;
