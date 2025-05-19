import Profile from "./Profile";
export default function RankingProfile() {
  return (
    <div>
      <Profile
        rank="1"
        imgSrc="/images/img.png"
        name="이미림이"
        score={100}
        description="💯여자친구 마음 읽기 마스터"
        rankColor="#EE6983"
      />
      <Profile
        rank="2"
        imgSrc="/images/img.png"
        name="양은서"
        score={90}
        description="💘텔레파시 통하는 완벽 남친"
        rankColor="#EE6983"
      />
      <Profile
        rank="3"
        imgSrc="/images/img.png"
        name="안채연"
        score={80}
        description="🕶️눈치 백단 남친"
        rankColor="#EE6983"
      />
      <Profile
        rank="4"
        imgSrc="/images/img.png"
        name="이서영"
        score={70}
        description="🫣귀신같은 눈치남!"
      />
      <Profile
        rank="5"
        imgSrc="/images/img.png"
        name="심정민"
        score={60}
        description="📚센스 업그레이드형 남친"
      />
      <Profile
        rank="6"
        imgSrc="/images/img.png"
        name="구아연"
        score={50}
        description="🛠️센스 업그레이드 진행 중인 남친"
      />
      <Profile
        rank="7"
        imgSrc="/images/img.png"
        name="김예린"
        score={40}
        description="💬나름 노력파 남친"
      />
      <Profile
        rank="8"
        imgSrc="/images/img.png"
        name="장하영"
        score={30}
        description="🤔연애 초보 탐험가 남친"
      />
      <Profile
        rank="9"
        imgSrc="/images/img.png"
        name="양혜원"
        score={20}
        description="😅 감 잡는 중인 남친"
      />
      <Profile
        rank="10"
        imgSrc="/images/img.png"
        name="안민선"
        score={10}
        description="🚨감 잡아야 하는 남친"
      />
    </div>
  );
}
