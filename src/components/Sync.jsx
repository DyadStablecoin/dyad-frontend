import PoolABI from "../abi/Pool.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_POOL } from "../consts/contract";
import PopupContent from "./PopupContent";
import useGasCost from "../hooks/useGasCost";
import { SwapRightOutlined } from "@ant-design/icons";
import useNftSyncSimulation from "../hooks/useNftSyncSimulation";

export default function Sync({ onClose, setTxHash, tokenId, nft }) {
  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_POOL,
    contractInterface: PoolABI["abi"],
    functionName: "sync",
  });

  const { write } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });

  const { gasCost } = useGasCost(config);
  const { nftAfterSimulation, isLoading } = useNftSyncSimulation(tokenId);

  return (
    <PopupContent
      title="Sync"
      btnText="Sync"
      onClick={() => {
        onClose();
        write?.();
      }}
      isDisabled={!write}
      isLoading={isLoading}
      infoOnClick={() =>
        window.open("https://docs-psi-six.vercel.app/pool#sync")
      }
    >
      <div className="flex flex-col gap-4">
        {nftAfterSimulation && (
          <>
            <div className="flex justify-between">
              <div className="text-sm">Before</div>
              <div className="text-sm">After</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-[#737E76]">XP</div>
                <div>{nft.xp}</div>
              </div>
              <div>
                <SwapRightOutlined />
              </div>
              <div className="flex gap-6 items-center justify-center">
                {parseInt(nftAfterSimulation[2]._hex)}
                <div className="flex gap-1 items-center">
                  <div className="text-sm text-green-300">+</div>
                  <div className="text-sm">
                    {parseInt(nftAfterSimulation[2]._hex) - nft.xp}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#3A403C] h-[1px] w-full"></div>
          </>
        )}
        <div>+ help sync ALL DYAD NFT's for all players!</div>
        <div className="bg-[#3A403C] h-[1px] w-full"></div>
        <div className="flex justify-between">
          <div>Sync Cost</div>
          <div className="text-[#519C58]">{gasCost} ETH</div>
        </div>
      </div>
    </PopupContent>
  );
}
