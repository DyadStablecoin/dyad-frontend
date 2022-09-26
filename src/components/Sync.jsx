import Button from "./Button";
import abi from "../consts/abi/dyadABI.json";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Loading from "./Loading";

export default function Sync({ address, tokenId }) {
  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "syncTokenId",
    args: [tokenId],
  });

  const {
    data,
    isLoading: isLoadingSync,
    isSuccess,
    write,
  } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="flex flex-col items-center p-14 gap-8">
      {(isLoadingSync || isLoading) && <Loading isLoading />}
      <Button
        disabled={!write}
        onClick={() => {
          console.log(333);
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
