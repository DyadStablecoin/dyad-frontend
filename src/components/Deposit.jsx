import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dyadABI.json";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { ethers } from "ethers";

export default function Deposit({ address, tokenId }) {
  const [wETH, setWETH] = useState(0);
  const [ethToUSD, setEthToUSD] = useState(0);

  console.log("tokenId", tokenId);
  console.log(parseInt(ethers.utils.parseEther("0.01")._hex));
  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "deposit",
    // args: [0, parseInt(ethers.utils.parseEther("0.0001")._hex)],
    args: [0, ethers.utils.parseEther("0.01")],
    // args: [12, 1000000],
  });

  useEffect(() => {
    async function getETHPrice() {
      const res = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
      );
      const data = await res.json();
      setEthToUSD(data.USD);
    }

    getETHPrice();
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <div className="flex gap-2 text-2xl items-center justify-center">
        <div className="w-[10rem]">
          <TextInput
            value={wETH}
            onChange={(v) => setWETH(v)}
            placeholder={0}
          />
        </div>
        <div className="underline">ETH</div>
      </div>
      <div>to</div>
      <div className="text-2xl">
        ${Math.round(wETH * ethToUSD * 100) / 100} DYAD
      </div>
      <Button
        disabled={!write}
        onClick={() => {
          console.log(333333);
          write?.();
        }}
      >
        deposit DYAD
      </Button>
    </div>
  );
}
