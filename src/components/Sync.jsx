import Button from "./Button";
import PoolABI from "../abi/Pool.json";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_POOL } from "../consts/contract";
import Loading from "./Loading";

export default function Sync() {
  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_POOL,
    contractInterface: PoolABI["abi"],
    functionName: "sync",
  });

  const { data, isLoading: isLoadingSync, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="flex flex-col items-center p-14 gap-8">
      {(isLoadingSync || isLoading) && <Loading isLoading />}
      <Button
        isDisabled={!write}
        onClick={() => {
          write?.();
        }}
      >
        sync dNFT
      </Button>
      <div className="flex flex-col items-center">
        <div>+8031 dNFTs</div>
        <div>950,000 GAS/ 0.2 ETH</div>
      </div>
    </div>
  );
}
