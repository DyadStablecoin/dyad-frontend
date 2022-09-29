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

  const [isApproved, setIsApproved] = useState(true);

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
    args: [CONTRACT_dNFT, wETH],
    onError: (error) => {
      console.log("error", error);
    },
  });

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: abi,
    functionName: "allowance",
    args: [address, CONTRACT_dNFT],
    onSuccess: (data) => {
      console.log(55555);
      const allowance = parseInt(data._hex);
      console.log("allowance", allowance);
      setIsApproved(allowance >= wETH);
      console.log("allowance", data);
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
            onBlur={(e) => {
              refetch();
            }}
          />
        </div>
        <div className="underline">ETH</div>
      </div>
      <div>to</div>
      <div className="text-2xl">
        {formatUSD(Math.round(wETH * ethToUSD * 100) / 100)} DYAD
      </div>
      {isApproved ? (
        <Button
          disabled={!write}
          onClick={() => {
            console.log(333333);
            write?.();
          }}
        >
          deposit DYAD
        </Button>
      ) : (
        <Button
          disabled={!write}
          onClick={() => {
            console.log(333333);
            write?.();
          }}
        >
          Approve
        </Button>
      )}
    </div>
  );
}
