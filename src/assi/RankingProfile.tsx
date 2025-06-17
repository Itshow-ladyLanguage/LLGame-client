import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { use, useEffect, useState } from "react";
import axios from "axios";

interface CoverButtonDesignProps {
  label: string;
  onClick?: () => void;
  labelColor?: string;
  hoverLabelColor?: string;
}

export default function RankingProfile() {
  const [users, setUsers] = useState<Object[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
      setUsers(res.data);
    } catch (e) {
      console.error("유저 생성 실패 : ", e);
      setError(error); //e에서 error로 잠시 변경
    } finally {
      setLoading(false);
    }
  };

  // 현재 로그인한 사용자 ID 가져오기
  const currentUserId = localStorage.getItem("userId");

  return (
    <div>
      {users.map((user: any, index: number) => (
        <Profile
          key={user.id}
          rank={index + 1}
          imgSrc={user.profile_image}
          name={user.name}
          score={user.score}
          description={user.type}
          rankColor="#EE6983"
          isCurrentUser={user.id.toString() === currentUserId}
        />
      ))}
    </div>
  );
}