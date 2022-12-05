import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import abi from "../consts/abi/dNFTABI.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther } from "../utils/currency";
import { round2 } from "../utils/currency";
import useNft from "../hooks/useNft";
import PopupContent from "./PopupContent";

export default function Withdraw({ tokenId, onClose, setTxHash }) {
  const [dyad, setDyad] = useState("");
  const { nft } = useNft(tokenId);

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
    <PopupContent
      title="Withdraw DYAD"
      btnText="Withdraw"
      onClick={() => {
        write?.();
        onClose();
      }}
      isDisabled={!write}
    >
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
          <div className="flex gap-2 items-center justify-center">
            <div className="text-[#737E76]">
              Balance:{round2(nft.deposit / 10 ** 18)}
            </div>
            <div
              className="text-[#584BAA] text-xl font-bold cursor-pointer"
              onClick={() => setDyad(round2(nft.deposit / 10 ** 18))}
            >
              MAX
            </div>
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
