import { useState, useEffect, useRef } from "react";

// 유형별 설명 데이터
const typeDescriptions: { [key: string]: string } = {
  "🚨 감 잡아야 하는 남친 🚨":
    "🚨 감 잡아야 하는 남친 🚨\n센스와 눈치 거의 없음. 여친을 좋아하는 마음은 있지만 지금은 많이 배워야 할 시기인 남친",
  "😅 감 잡는 중인 남친 😅":
    "😅 감 잡는 중인 남친 😅\n감은 오지만 반박자 늦음. 성장 가능성은 있지만 여친 입장에선 답답할 수도있는 남친",
  "🤔 연애 초보 탐험가 🤔":
    "🤔 연애 초보 탐험가 🤔\n감정 읽는 데 서툴지만 배우려는 의지가 있음. 엉뚱하지만 귀여운 초보형 남친",
  "💬 나름 노력파 남친 💬":
    "💬 나름 노력파 남친 💬\n여친을 위한다는 마음은 있지만 방식은 자기 기준. 방향만 잡아주면 성장 가능한 남친",
  "🛠️ 센스 업그레이드 진행 중인 남친 🛠️":
    "🛠️ 센스 업그레이드 진행 중인 남친 🛠️\n기념일은 챙기지만 포인트는 빗나감. 그래도 점점 발전하는 중이라 듬직한 남친",
  "📚 센스 업그레이드형 남친 📚":
    "📚 센스 업그레이드형 남친 📚\n기념일은 챙기지만 포인트는 빗나감. 그래도 점점 발전하는 중이라 새싹이 남친",
  "🤨 귀신같은 눈치남! 🤨":
    "🤨 귀신같은 눈치남! 🤨\n말 안 해도 직감으로 찰떡같이 캐치! 표현은 어설퍼도 타이밍은 탁월한 임팩트형 남친",
  "🕶️ 눈치 백단 남친! 🕶️":
    "🕶️ 눈치 백단 남친! 🕶️\n작은 힌트도 놓치지 않는 예리함. 조심스럽게 감정을 살피며 안정감을 주는 똑똑이 남친",
  "💘 연애의 달인! 💘":
    "💘 연애의 달인! 💘\n표정만 봐도 감정 파악! 대화와 눈빛으로 감정을 섬세하게 읽는 텔레파시형 남친",
  "💯 센스 만렙 💯":
    "💯 센스 만렙 💯\n여친 마음을 미리 읽고 행동하는 완벽형. 생리주기부터 기분 변화까지 전부 꿰고 있음. 싸움도 미리 방지하는 1등 남친.",
};

interface ProfileProps {
  rank: number | string;
  imgSrc: string;
  name: string;
  score: number;
  description: string;
  rankColor?: string;
  isCurrentUser?: boolean;
}

export default function Profile(props: ProfileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // 현재 사용자인 경우 자동 스크롤
  useEffect(() => {
    if (props.isCurrentUser && profileRef.current) {
      // 약간의 지연을 두어 페이지가 완전히 로드된 후 스크롤
      const timer = setTimeout(() => {
        profileRef.current?.scrollIntoView({
          behavior: "auto", // 즉시 점프
          block: "center", // 화면 중앙에 위치
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [props.isCurrentUser]);

  // 툴팁 내용 렌더링 함수
  const renderDescription = (description: string) => {
    return description.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < description.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div
      ref={profileRef} // ref 추가
      style={{
        background: props.isCurrentUser ? "#E2F8FF" : "#ffffff",
        width: "1087px",
        height: "110px",
        border: "2px solid #7a1d36",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        marginBottom: "23px",
        position: "relative",
      }}
    >
      <p
        style={{
          width: "60px",
          fontSize: "28px",
          marginLeft: "31px",
          color: props.rankColor || "#000000",
          fontWeight: "bold",
        }}
      >
        {props.rank}
      </p>
      <img
        src={props.imgSrc}
        alt="profile"
        style={{
          width: "93px",
          height: "93px",
          marginLeft: "80px",
          objectFit: "cover",
          borderRadius: "50px",
        }}
      />
      <p
        style={{
          fontSize: "28px",
          marginLeft: "39px",
          fontWeight: "bold",
          color: props.isCurrentUser ? "#000000" : "#000000",
        }}
      >
        {props.name}
      </p>
      <p
        style={{
          fontSize: "25px",
          marginLeft: "8px",
          fontWeight: "bold",
          color: props.isCurrentUser ? "#000000" : "#000000",
        }}
      >
        ({props.score}점)
      </p>
      <p
        style={{
          fontSize: "28px",
          marginLeft: "auto",
          marginRight: "44.5px",
          fontWeight: "500",
          cursor: "pointer",
          color: props.isCurrentUser ? "#000000" : "#000000",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {props.description}
      </p>

      {/* 호버 시 나타나는 설명 박스 */}
      {isHovered && typeDescriptions[props.description] && (
        <div
          style={{
            position: "absolute",
            top: "120px",
            right: "44.5px",
            backgroundColor: "#ffffff",
            border: "2px solid #E10CA1",
            borderRadius: "10px",
            padding: "15px",
            maxWidth: "300px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            zIndex: 10,
            fontSize: "16px",
            lineHeight: "1.4",
          }}
        >
          {renderDescription(typeDescriptions[props.description])}
        </div>
      )}
    </div>
  );
}
