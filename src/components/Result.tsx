import { useEffect } from "react";

export default function ResultPages() {
  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "1446px",
          height: "823.5px",
          border: "4.5px solid #E10CA1",
          borderRadius: "51px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            color: " #E10CA1",
            fontSize: "36px",
            margin: "0px",
          }}
        >
          당신의 여자어 실력은?
        </p>
        <p
          style={{
            fontSize: "45px",
            textAlign: "center",
            marginBottom: "45px",
          }}
        >
          💯"여자친구 마음 읽기 마스터"💯 <br />
          <strong>센스 만렙</strong>
        </p>
        <img
          src="/images/img.png"
          style={{
            width: "180px",
            height: "180px",
            marginBottom: "36px",
          }}
        />
        <p
          style={{
            fontSize: "33px",
            margin: "0px",
          }}
        >
          순위 : 1등
        </p>
        <p
          style={{
            fontSize: "33px",
            margin: "0px",
          }}
        >
          점수 : 45점
        </p>

        {/* 버튼 두 개를 가로로 정렬 */}
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            gap: "24px", // 버튼 사이 간격
          }}
        >
          <button
            style={{
              width: "204px",
              height: "71px",
              fontSize: "33px",
              borderRadius: "15px",
              border: "none",
              color: "#E10CA1",
            }}
          >
            랭킹 화면
          </button>
          <button
            style={{
              width: "204px",
              height: "71px",
              fontSize: "33px",
              borderRadius: "15px",
              border: "none",
              color: "#E10CA1",
            }}
          >
            게임 해설
          </button>
        </div>
      </div>
    </div>
  );
}
