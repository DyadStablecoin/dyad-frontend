import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dNFTABI.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther } from "../utils/currency";

export default function Withdraw({ tokenId, onClose, setTxHash }) {
  const [dyad, setDyad] = useState("");

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "withdraw",
    args: [tokenId, parseEther(dyad)],
  });

  const { write } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });

  return (
    <div
      className="flex flex-col gap-4 items-center"
      style={{
        boxShadow: "0 0 40px #413E6a",
      }}
    >
      <div className="pt-5 pr-5 pl-5 text-2xl">Withdraw DYAD</div>
      <div className="bg-[#3A403C] h-[1px] w-full"></div>
      <div className="flex gap-2 items-center">
        <div>
          <TextInput
            value={dyad}
            onChange={(v) => setDyad(v)}
            placeholder={0}
            type="number"
          />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex">
            <div className="rhombus" />
            <div>DYAD</div>
          </div>
          <div className="flex gap-2">
            <div className="text-[#737E76]">Balance:0</div>
            <div className="text-[#584BAA]">MAX</div>
          </div>
        </div>
      </div>
      <div className="text-[#519C58] bg-[#0E190F] border-[1px] border-[#519C58] w-full flex items-center justify-center p-[1rem]">
        Withdraw
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <div className="flex gap-2 text-2xl items-center">
        <div className="w-[10rem]">
          <TextInput
            value={dyad}
            onChange={(v) => setDyad(v)}
            placeholder={0}
            type="number"
          />
        </div>
        <div className="">$DYAD</div>
      </div>
      <Button
        isDisabled={!write}
        onClick={() => {
          write?.();
          onClose();
        }}
      >
        withdraw DYAD
      </Button>
    </div>
  );
}
