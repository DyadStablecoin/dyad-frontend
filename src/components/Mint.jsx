import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dyadABI.json";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";

export default function Mint({ address, tokenId }) {
  const [wETH, setWETH] = useState(0);
  const [ethToUSD, setEthToUSD] = useState(0);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "mintDyad",
    args: [tokenId, wETH],
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
      <div className="flex gap-2 text-2xl items-center">
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
      <div className="text-2xl">${wETH * ethToUSD} DYAD</div>
      <Button disabled={!write} onClick={() => write?.()}>
        mint DYAD 15-30 min
      </Button>
      <div className="flex flex-col items-center">
        <div>+8031 dNFTs</div>
        <div>950,000 GAS/ .02 ETH</div>
      </div>
      <Button>mint DYAD instantly</Button>
    </div>
  );
}
