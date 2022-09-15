import Button from "./Button";
import abi from "../consts/abi/dyadABI.json";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";

export default function Sync() {
  const [tokenId, setTokenId] = useState(0);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "syncTokenId",
    args: [tokenId],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div className="flex flex-col items-center p-14 gap-8">
      <Button
        disabled={!write}
        onClick={() => {
          write();
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
