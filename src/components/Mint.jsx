import {
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useBalance,
} from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dNFTABI.json";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { formatUSD } from "../utils/currency";
import { ethers } from "ethers";

export default function Mint({ address, tokenId, ETH2USD }) {
  const [wETH, setWETH] = useState(0.0001);
  const { data: ethBalance } = useBalance({ addressOrName: address });
  console.log("ethBalance", ethBalance);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "mintDyad",
    args: [parseInt(tokenId)],
    overrides: { value: ethers.utils.parseEther(String(wETH)) },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log("tokenId", tokenId);

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  console.log("mint", write);

  // write({
  //   args: [tokenId],
  //   overrides: { value: ethers.utils.parseEther("0.01") },
  // });

  // write({ overrides: { value: ethers.utils.parseEther("0.001") } });

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <div className="flex gap-2 text-2xl items-center">
        <div className="w-[10rem]">
          <TextInput
            value={wETH}
            onChange={(v) => setWETH(v)}
            placeholder={0}
          />
        </div>
        <div className="underline">ETH</div>
        <Button
          onClick={() => {
            setWETH(ethBalance.formatted);
          }}
        >
          MAX
        </Button>
      </div>
      <div>to</div>
      <div className="text-2xl">
        {formatUSD(Math.round(wETH * ETH2USD * 100) / 100)} DYAD
      </div>
      <Button disabled={!write} onClick={() => write?.()}>
        mint DYAD 15-30 min
      </Button>
      <div className="flex flex-col items-center">
        <div>+8031 dNFTs</div>
        <div>950,000 GAS/ .02 ETH</div>
      </div>
      <Button isPrimary>mint DYAD instantly</Button>
    </div>
  );
}
