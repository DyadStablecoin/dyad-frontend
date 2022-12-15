import PoolABI from "../abi/Pool.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_POOL } from "../consts/contract";
import PopupContent from "./PopupContent";
import useGasCost from "../hooks/useGasCost";
import useNftSyncSimulation from "../hooks/useNftSyncSimulation";
import { DOCS_URL } from "../consts/consts";
import SyncLastEthPrice from "./SyncLastEthPrice";
import SyncXp from "./SyncXp";

export default function Sync({ onClose, setTxHash, nft }) {
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
  // const { isLoading } = useNftSyncSimulation(nft.id);

  return (
    <PopupContent
      title="Sync"
      btnText="Sync"
      onClick={() => {
        onClose();
        write?.();
      }}
      isDisabled={!write}
      // isLoading={isLoading}
      infoOnClick={() => window.open(DOCS_URL + "/pool#sync")}
    >
      <div className="flex flex-col gap-4">
        <>
          <div className="flex justify-between">
            <div className="text-sm">Before</div>
            <div className="text-sm">After</div>
          </div>
          <SyncLastEthPrice />
          {/* <SyncXp nft={nft} /> */}
          <div className="bg-[#3A403C] h-[1px] w-full"></div>
        </>
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
