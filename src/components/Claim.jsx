import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dyadABI.json";
import { useState } from "react";
import { useForceUpdate } from "../utils/render";

export default function Claim({ address, reload, setReload }) {
  const [totalSupply, setTotalSupply] = useState(0);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "mint",
    args: [address],
    onSuccess: () => {
      console.log("mint", data);
    },
  });

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "totalSupply",
    onSuccess: (data) => {
      console.log("totalSupply", data);
      setTotalSupply(data._hex);
    },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const {} = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      console.log("onSuccess");
      setReload(!reload);
      refetch();
    },
    onSettled: () => {
      console.log("onSettled");
      setReload(!reload);
      refetch();
    },
  });

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
