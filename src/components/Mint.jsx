import {
  useContractWrite,
  usePrepareContractWrite,
  useBalance,
  useAccount,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dNFTABI.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { formatUSD, useEthPrice } from "../utils/currency";
import { ethers } from "ethers";
import Loading from "./Loading";

export default function Mint({ tokenId, reload, setReload, onClose }) {
  const { address } = useAccount();
  const ethPrice = useEthPrice();

  const [wETH, setWETH] = useState(0);
  const { data: ethBalance } = useBalance({ addressOrName: address });

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "mintDyad",
    args: [tokenId],
    overrides: { value: ethers.utils.parseEther(wETH ? String(wETH) : "0") },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      onClose(); // close modal
      setReload(!reload);
    },
  });

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      {isLoading && <Loading isLoading />}
      <div className="flex gap-2 text-2xl items-center">
        <div className="w-[10rem]">
          <TextInput
            value={wETH}
            onChange={(v) => {
              setWETH(v);
            }}
            placeholder={0}
            // type="number"
            // min={0}
          />
        </div>
        <div className="">ETH</div>
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
        {formatUSD(Math.round(wETH * ethPrice * 100) / 100)} DYAD
      </div>
      <Button isDisabled={!write} onClick={() => write?.()}>
        mint DYAD 15-30 min
      </Button>
      <div className="flex flex-col items-center">
        <div>+8031 dNFTs</div>
        <div>950,000 GAS/ .02 ETH</div>
      </div>
      <Button isSecondar isDisabled={!write}>
        mint DYAD instantly
      </Button>
    </div>
  );
}
