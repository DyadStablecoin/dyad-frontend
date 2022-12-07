import { ReloadOutlined } from "@ant-design/icons";
import useNfts from "../hooks/useNfts";

export default function LeaderboardHeader() {
  const { refetch } = useNfts();

  return (
    <div className="flex gap-4 pt-10 pb-4 justify-center">
      <div className="text-xl">Global Leaderboard</div>
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => refetch()}
      >
        <ReloadOutlined
          style={{
            fontSize: "1.2rem",
            color: "#584BAA",
          }}
        />
      </div>
    </div>
  );
}
