import {
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useContractRead,
} from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dNFTABI.json";
import dyadABI from "../consts/abi/dNFTABI.json";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { BigNumber } from "ethers";
import { ethers } from "ethers";

export default function Withdraw({ address, tokenId, ETH2USD }) {
  const [dyad, setDyad] = useState(0);
  const [balanceOf, setBalanceOf] = useState(0);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "withdraw",
    args: [tokenId, ethers.utils.parseEther(String(dyad))],
    onError: (error) => {
      console.log("error", error);
    },
  });

  const {} = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI,
    functionName: "balanceOf",
    args: [address],
    onSuccess: (data) => {
      console.log("balanceOf", data);
      setBalanceOf(parseInt(data._hex));
    },
    onError: (e) => {
      console.log("balanceOf", e);
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
        <div className="">$DYAD</div>
        {balanceOf}
      </div>
      {/* <div>to</div> */}
      {/* <div className="text-2xl">${wETH * ethToUSD} ETH</div> */}
      <Button
        isDisabled={!write}
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
