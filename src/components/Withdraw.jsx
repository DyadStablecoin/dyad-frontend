import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { round, floor, normalize, parseEther } from "../utils/currency";
import PopupContent from "./PopupContent";
import MaxButton from "./MaxButton";
import useMaxWithdrawl from "../hooks/useMaxWithdrawl";
import PopupRow from "./PopupRow";
import PopupDivider from "./PopupDivider";
import useAverageTVL from "../hooks/useAverageTVL";
import useCR from "../hooks/useCR";
import { SAFETY_MODE_THRESHOLD } from "../consts/consts";

export default function Withdraw({ nft, onClose, setTxHash }) {
  const [dyad, setDyad] = useState("");
  const { maxWithdrawl } = useMaxWithdrawl(nft);
  const { averageTVL } = useAverageTVL();
  const { cr } = useCR();

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "withdraw",
    args: [nft.id, parseEther(dyad)],
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
      <div className="flex flex-col gap-2">
        <PopupRow>
          <div className="text-sm">
            Protocol CR (min. {SAFETY_MODE_THRESHOLD}%)
          </div>
          <div className="text-sm">{round(cr, 2)} %</div>
        </PopupRow>
        <PopupRow>
          <div className="text-sm">Average dNFT TVL</div>
          <div className="text-sm">{round(averageTVL, 2)} DYAD</div>
        </PopupRow>
        <PopupRow>
          <div className="text-sm">dNFT Deposit</div>
          <div className="text-sm">{round(normalize(nft.deposit), 2)} DYAD</div>
        </PopupRow>
        <PopupDivider />
        <div className="flex gap-2 items-center mt-4">
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
                Balance:{round(maxWithdrawl, 2)}
              </div>
              <MaxButton onClick={() => setDyad(floor(maxWithdrawl, 2))} />
            </div>
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
