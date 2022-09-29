import {
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useContractRead,
} from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "../consts/contract";
import Button from "./Button";
// import abi from "../consts/abi/dNFTABI.json";
import abi from "../consts/abi/dyadABI.json";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { ethers } from "ethers";
import { formatUSD } from "../utils/currency";

export default function Deposit({ address, tokenId }) {
  const [wETH, setWETH] = useState(0);
  const [ethToUSD, setEthToUSD] = useState(0);

  // const { config } = usePrepareContractWrite({
  //   addressOrName: CONTRACT_dNFT,
  //   contractInterface: abi,
  //   functionName: "deposit",
  //   // args: [0, parseInt(ethers.utils.parseEther("0.0001")._hex)],
  //   // args: [tokenId, ethers.utils.parseEther("0.0001")],
  //   args: [1, 100],
  //   onError: (error) => {
  //     console.log("error", error);
  //   },
  // });

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_DYAD,
    contractInterface: abi,
    functionName: "approve",
    // args: [0, parseInt(ethers.utils.parseEther("0.0001")._hex)],
    // args: [tokenId, ethers.utils.parseEther("0.0001")],
    args: [CONTRACT_dNFT, 9999],
    onError: (error) => {
      console.log("error", error);
    },
  });

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: abi,
    functionName: "allowance",
    args: [CONTRACT_dNFT, address],
    onSuccess: (data) => {
      console.log("data", data);
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

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

  // const { data, isLoading, isSuccess, write } = useContractWrite(config);

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
        {formatUSD(Math.round(wETH * ethToUSD * 100) / 100)} DYAD
      </div>
      <Button
        disabled={!write}
        onClick={() => {
          console.log(333333);
          write?.();
        }}
      >
        Approve
      </Button>
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
