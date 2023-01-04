import { dNFT_PRICE } from "../consts/consts";
import useLastSyncVersion from "../hooks/useLastSyncVersion";
import useRank from "../hooks/useRankFromIndexer";
import { formatUSD } from "../utils/currency";

const HEADER = "text-gray-500 text-sm";

export default function NftStats({ nft }) {
  const { lastSyncVersion } = useLastSyncVersion();
  const { rank } = useRank(nft.id, lastSyncVersion);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className={HEADER}>Rank</div>
        <div className="">{rank ? "#" + rank : "Syncing"}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className={HEADER}>Value</div>
        <div className="">{formatUSD(dNFT_PRICE)}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className={HEADER}>XP</div>
        <div className="">{nft.xp}</div>
      </div>
    </>
  );
}
