import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

type User = {
  id: number;
  name: string;
  score: number;
  profile_image: string;
};


export default function ResultPages() {
  const location = useLocation();
  const finalScore = Number(location.state?.finalScore ?? 0);
  
  const [isRankHovered, setIsRankHovered] = useState(false);
  const [isExplainHovered, setIsExplainHovered] = useState(false);
  const [isExplainClicked, setIsExplainClicked] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState<string>("");
  const [rank, setRank] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [scoreSaved, setScoreSaved] = useState(false); // 점수 저장 완료 여부

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  // 점수에 따른 결과 메시지 반환 함수
  const getResultMessage = (score: number) => {
    if (score >= 0 && score <= 100) {
      return {
        title: '"여자친구의 마음은 퀴즈보다 어렵다..."',
        subtitle: "🚨 감 잡아야 하는 남친 🚨",
      };
    } else if (score >= 101 && score <= 200) {
      return {
        title: '"여자친구 마음, 난이도 하~중"',
        subtitle: "😅 감 잡는 중인 남친 😅",
      };
    } else if (score >= 201 && score <= 300) {
      return {
        title: '"여자친구의 마음은 미로 같다..."',
        subtitle: "🤔 연애 초보 탐험가 🤔",
      };
    } else if (score >= 301 && score <= 400) {
      return {
        title: '"여자친구의 마음을 70%쯤은 안다고 믿고 싶다..."',
        subtitle: "💬 나름 노력파 남친 💬",
      };
    } else if (score >= 401 && score <= 500) {
      return {
        title: '"괜찮아, 더 노력하면 돼!"',
        subtitle: "🛠️ 센스 업그레이드 진행 중인 남친 🛠️",
      };
    } else if (score >= 501 && score <= 600) {
      return {
        title: '"조금만 더 공부하면 완벽할 텐데!"',
        subtitle: "📚 센스 업그레이드형 남친 📚",
      };
    } else if (score >= 601 && score <= 700) {
      return {
        title: '"이거 어떻게 알았어?"',
        subtitle: "🤨 귀신같은 눈치남! 🤨",
      };
    } else if (score >= 701 && score <= 800) {
      return {
        title: '"설마.. 내 생각 읽었어?"',
        subtitle: "🕶️ 눈치 백단 남친! 🕶️",
      };
    } else if (score >= 801 && score <= 900) {
      return {
        title: '"텔레파시 통하는 완벽 남친!"',
        subtitle: "💘 연애의 달인! 💘",
      };
    } else if (score >= 901 && score <= 999) {
      return {
        title: '"여자친구 마음 읽기 마스터"',
        subtitle: "💯 센스 만렙 💯",
      };
    } else {
      return {
        title: '"여자친구 마음 읽기 마스터"',
        subtitle: "💯 센스 만렙 💯",
      };
    }
  };

  const resultMessage = getResultMessage(finalScore);

  // 서버에 결과 저장
  useEffect(() => {
    const saveResultToServer = async () => {
      try {
        console.log("점수 저장 시작:", { finalScore, userId });
        const response = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/users/${userId}`,
          {
            score: finalScore,
            type: resultMessage.subtitle,
          }
        );
        console.log("점수 저장 완료:", response.data);
        setScoreSaved(true); // 점수 저장 완료 표시
      } catch (error) {
        console.error("서버 저장 실패:", error);
      }
    };

    if (finalScore > 0 && userId && !scoreSaved) {
      saveResultToServer();
    }
  }, [finalScore, resultMessage.subtitle, userId, scoreSaved]);

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

  // 전체 사용자 목록과 순위 계산 (점수 저장 후에 실행)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("랭킹 계산 시작");
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
        const allUsers = response.data;
        setUsers(allUsers);

        console.log("전체 사용자 목록:", allUsers);
        console.log("현재 userId:", userId, "타입:", typeof userId);

        // 랭킹 계산: 점수를 기준으로 내림차순 정렬
        const sortedUsers = allUsers.sort((a: any, b: any) => b.score - a.score);
        console.log("정렬된 사용자 목록 (상위 5명):", sortedUsers.slice(0, 5));

        // 현재 사용자 찾기
        const userRank = sortedUsers.findIndex((user: any) => {
          const match = String(user.id) === String(userId);
          if (match) {
            console.log("사용자 찾음:", user);
          }
          return match;
        }) + 1;

        console.log("계산된 순위:", userRank);
        
        if (userRank === 0) {
          console.error("사용자를 찾을 수 없습니다!");
          console.log("찾으려는 userId:", userId);
          console.log("서버의 user.id 목록:", allUsers.map((u: User) => ({ id: u.id, type: typeof u.id })));
        }
        
        setRank(userRank > 0 ? userRank : null);
      } catch (error) {
        console.error("사용자 목록 가져오기 실패:", error);
      }
    };

    // 점수가 저장된 후에만 랭킹 계산
    if (userId && scoreSaved) {
      fetchUsers();
    }
  }, [userId, scoreSaved]);

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
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
        <p style={{ fontSize: "33px", margin: "0px" }}>순위 : {rank}등</p>
        <p style={{ fontSize: "33px", margin: "0px" }}>점수 : {finalScore}점</p>

        <div
          style={{
            marginTop: "50px",
            display: "flex",
            gap: "24px",
            position: "relative",
          }}
        >
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
            onClick={() => navigate("/RankingPages")}
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
              color:
                isExplainHovered || isExplainClicked ? "#ffffff" : "#E10CA1",
              backgroundColor:
                isExplainHovered || isExplainClicked ? "#E10CA1" : "#ECECEC",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsExplainHovered(true)}
            onMouseLeave={() => setIsExplainHovered(false)}
            onClick={() => setIsExplainClicked((prev) => !prev)}
          >
            게임 해설
          </button>
        </div>

        {isExplainClicked && (
          <img
            src="/images/Qr.png"
            alt="게임 해설 이미지"
            style={{
              position: "absolute",
              left: "60%",
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