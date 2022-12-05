import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dNFTABI.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { formatUSD, parseEther, useEthPrice } from "../utils/currency";
import { useBalances } from "../hooks/useBalances";

export default function Mint({ tokenId, onClose, setTxHash }) {
  const ethPrice = useEthPrice();
  const { balances } = useBalances();

  const [wETH, setWETH] = useState("");

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "mintDyad",
    args: [tokenId],
    overrides: {
      value: parseEther(wETH),
    },
  });

  const { write } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      onClose(); // close modal
      setTxHash(data?.hash);
    },
  });

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <div className="flex gap-2 text-2xl items-center">
        <div className="w-[10rem]">
          <TextInput
            value={wETH}
            onChange={(v) => {
              setWETH(v);
            }}
            placeholder={0}
            type="number"
          />
        </div>
        <div className="">ETH</div>
        <Button
          onClick={() => {
            setWETH(balances.balanceOfEth);
          }}
        >
          MAX
        </Button>
      </div>
      <div>to</div>
      <div className="text-2xl">
        {formatUSD(Math.round(wETH * ethPrice * 100) / 100)} DYAD
      </div>
      <Button
        isDisabled={!write}
        onClick={() => {
          write?.();
          onClose();
        }}
      >
        mint DYAD
      </Button>
    </div>
  );
}
