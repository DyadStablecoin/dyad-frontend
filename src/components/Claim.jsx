import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dyadABI.json";
import { useState } from "react";

export default function Claim({ address }) {
  const [totalSupply, setTotalSupply] = useState(0);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "mint",
    args: [address],
  });

  const {} = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "totalSupply",
    onSuccess: (data) => setTotalSupply(data._hex),
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <div className="flex gap-8 border-[1px] border-white border-dotted p-4 items-center justify-between">
        <div className="">{parseInt(totalSupply)}/2600 dNFTs available</div>
        <Button
          disabled={!write}
          onClick={() => {
            write?.();
          }}
        >
          claim dNFT
        </Button>
        <div className="">5,000 $DYAD minimum deposit</div>
      </div>
    </div>
  );
}
