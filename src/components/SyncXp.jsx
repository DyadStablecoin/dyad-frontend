import { SwapRightOutlined } from "@ant-design/icons";
import useNftSyncSimulation from "../hooks/useNftSyncSimulation";

export default function SyncXp({ nft }) {
  const { nftAfterSimulation } = useNftSyncSimulation(nft.id);

  return (
    <>
      {nftAfterSimulation && (
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[#737E76]">XP</div>
            <div>{nft.xp}</div>
          </div>
          <div>
            <SwapRightOutlined />
          </div>
          <div className="flex gap-6 items-center justify-between">
            {parseInt(nftAfterSimulation[2]._hex)}
            <div className="flex gap-1 items-center">
              <div className="text-sm text-green-300">+</div>
              <div className="text-sm">
                {parseInt(nftAfterSimulation[2]._hex) - nft.xp}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
