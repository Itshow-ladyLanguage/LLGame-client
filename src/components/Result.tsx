import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ResultPages() {
  const location = useLocation();

  // SuQuizPages에서 전달받은 최종 점수
  const finalScore = Number(location.state?.finalScore ?? 0);

  // 디버깅용: 전달받은 최종 점수 로그
  useEffect(() => {
    console.log("ResultPages - 전달받은 최종 점수:", finalScore);
    console.log("location.state:", location.state);
  }, [finalScore]);

  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  const [isRankHovered, setIsRankHovered] = useState(false);
  const [isExplainHovered, setIsExplainHovered] = useState(false);
  const [isExplainClicked, setIsExplainClicked] = useState(false);
  const userId = localStorage.getItem("userId");
  const image = localStorage.getItem("profile_image"); // 사용하지 않는 변수지만 유지

  // 점수에 따른 결과 메시지 반환 함수
  const getResultMessage = (score: number) => {
    if (score >= 0 && score <= 100) {
      return {
        title: '🚨 "여자친구의 마음은 퀴즈보다 어렵다..." 🚨',
        subtitle: "감 잡아야 하는 남친",
      };
    } else if (score >= 101 && score <= 200) {
      return {
        title: '😅 "여자친구 마음, 난이도 하~중" 😅',
        subtitle: "감 잡는 중인 남친",
      };
    } else if (score >= 201 && score <= 300) {
      return {
        title: '🤔 "여자친구의 마음은 미로 같다..." 🤔',
        subtitle: "연애 초보 탐험가",
      };
    } else if (score >= 301 && score <= 400) {
      return {
        title: '💬 "여자친구의 마음을 70%쯤은 안다고 믿고 싶다..." 💬',
        subtitle: "나름 노력파 남친",
      };
    } else if (score >= 401 && score <= 500) {
      return {
        title: '🛠️ "괜찮아, 더 노력하면 돼!" 🛠️',
        subtitle: "센스 업그레이드 진행 중!",
      };
    } else if (score >= 501 && score <= 600) {
      return {
        title: '📚 "조금만 더 공부하면 완벽할 텐데!" 📚',
        subtitle: "센스 업그레이드형 남친",
      };
    } else if (score >= 601 && score <= 700) {
      return {
        title: '🤨 "이거 어떻게 알았어?" 🤨',
        subtitle: "귀신같은 눈치남!",
      };
    } else if (score >= 701 && score <= 800) {
      return {
        title: '🕶️ "설마.. 내 생각 읽었어?" 🕶️',
        subtitle: "눈치 백단 남친!",
      };
    } else if (score >= 801 && score <= 900) {
      return {
        title: '💘 "텔레파시 통하는 완벽 남친!" 💘',
        subtitle: "연애의 달인!",
      };
    } else if (score >= 901 && score <= 999) {
      return {
        title: '💯 "여자친구 마음 읽기 마스터" 💯',
        subtitle: "센스 만렙",
      };
    } else {
      // 999점을 초과하는 경우 최고 등급으로 처리
      return {
        title: '💯 "여자친구 마음 읽기 마스터" 💯',
        subtitle: "센스 만렙",
      };
    }
  };

  const resultMessage = getResultMessage(finalScore);

  // 서버에 결과 저장하는 useEffect
  useEffect(() => {
    const saveResultToServer = async () => {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/users/${userId}`,
          {
            score: finalScore,
            type: resultMessage.title,
          }
        );
        console.log("점수 및 유형 저장:", response.data);
      } catch (error) {
        console.error("서버 저장 실패:", error);
      }
    };

    if (finalScore > 0 && userId) {
      saveResultToServer();
    }
  }, [finalScore, resultMessage.title, userId]);

  // 사용자 정보를 가져오는 state 추가
  const [userProfileImage, setUserProfileImage] = useState<string>("");

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${userId}`
        );
        if (response.data && response.data.profile_image) {
          setUserProfileImage(response.data.profile_image);
        }
      } catch (error) {
        console.error("사용자 정보 불러오기 실패:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

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
          position: "relative",
        }}
      >
        <p style={{ color: "#E10CA1", fontSize: "36px", margin: "0px" }}>
          당신의 여자어 실력은?
        </p>
        <p
          style={{
            fontSize: "45px",
            textAlign: "center",
            marginBottom: "45px",
          }}
        >
          {resultMessage.title} <br />
          <strong>{resultMessage.subtitle}</strong>
        </p>
        {userProfileImage && (
          <img
            src={userProfileImage}
            alt="Profile"
            style={{
              width: "180px",
              height: "180px",
              marginBottom: "36px",
              borderRadius: "50%", // 프로필 이미지를 원형으로
              objectFit: "cover",
            }}
          />
        )}
        <p style={{ fontSize: "33px", margin: "0px" }}>순위 : 1등</p>
        <p style={{ fontSize: "33px", margin: "0px" }}>점수 : {finalScore}점</p>

        <div
          style={{
            marginTop: "50px",
            display: "flex",
            gap: "24px",
            position: "relative",
          }}
        >
          {/* 랭킹 화면 버튼 */}
          <button
            style={{
              width: "204px",
              height: "71px",
              fontSize: "33px",
              borderRadius: "15px",
              border: "none",
              color: isRankHovered ? "#ffffff" : "#E10CA1",
              backgroundColor: isRankHovered ? "#E10CA1" : "#ECECEC",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsRankHovered(true)}
            onMouseLeave={() => setIsRankHovered(false)}
          >
            랭킹 화면
          </button>

          {/* 게임 해설 버튼 */}
          <button
            style={{
              width: "204px",
              height: "71px",
              fontSize: "33px",
              borderRadius: "15px",
              border: "none",
              color:
                isExplainHovered || isExplainClicked ? "#ffffff" : "#E10CA1",
              backgroundColor:
                isExplainHovered || isExplainClicked ? "#E10CA1" : "#ECECEC",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsExplainHovered(true)}
            onMouseLeave={() => setIsExplainHovered(false)}
            onClick={() => setIsExplainClicked((prev) => !prev)} // toggle
          >
            게임 해설
          </button>
        </div>

        {/* 게임 해설 이미지 토글 */}
        {isExplainClicked && (
          <img
            src="/images/Qr.png"
            alt="게임 해설 이미지"
            style={{
              position: "absolute",
              left: "60%", // 버튼 오른쪽
              top: "55%",
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "12px",
              border: "2px solid #E10CA1",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
        )}
      </div>
    </div>
  );
}
