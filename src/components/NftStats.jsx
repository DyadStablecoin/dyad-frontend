import { dNFT_PRICE } from "../consts/consts";
import useLastSyncVersion from "../hooks/useLastSyncVersion";
import useRank from "../hooks/useRankFromIndexer";
import { formatUSD } from "../utils/currency";
import Label from "./Label";

export default function NftStats({ nft }) {
  const { lastSyncVersion } = useLastSyncVersion();
  const { rank } = useRank(nft.tokenId, lastSyncVersion);

  return (
    <>
      <div className="flex justify-between items-center">
        <Label>Rank</Label>
        <div>{rank ? "#" + rank : "Syncing"}</div>
      </div>
      <div className="flex justify-between items-center">
        <Label>Value</Label>
        <div>{formatUSD(dNFT_PRICE)}</div>
      </div>
      <div className="flex justify-between items-center">
        <Label>XP</Label>
        <div>{nft.xp}</div>
      </div>
    </>
  );
}
