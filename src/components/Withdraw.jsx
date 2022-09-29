import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dNFTABI.json";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { BigNumber } from "ethers";

export default function Withdraw({ address, tokenId, ETH2USD }) {
  const [dyad, setDyad] = useState(0);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "withdraw",
    args: [tokenId, dyad],
    onError: (error) => {
      console.log("error", error);
    },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <div className="flex gap-2 text-2xl items-center">
        <div className="w-[10rem]">
          <TextInput
            value={dyad}
            onChange={(v) => setDyad(v)}
            placeholder={0}
          />
        </div>
        <div className="underline">$DYAD</div>
      </div>
      {/* <div>to</div> */}
      {/* <div className="text-2xl">${wETH * ethToUSD} ETH</div> */}
      <Button
        disabled={!write}
        onClick={() => {
          console.log(4444);
          write?.();
        }}
      >
        withdraw DYAD
      </Button>
    </div>
  );
}
