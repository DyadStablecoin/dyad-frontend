import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useAccount,
} from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "../consts/contract";
import abi from "../consts/abi/dyadABI.json";
import dNFTabi from "../consts/abi/dNFTABI.json";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { parseEther, round2 } from "../utils/currency";
import PopupContent from "./PopupContent";
import { useBalances } from "../hooks/useBalances";

export default function Deposit({ tokenId, onClose, setTxHash }) {
  const { address } = useAccount();
  const [dyad, setDyad] = useState("");
  const [isApproved, setIsApproved] = useState(true);
  const { balances } = useBalances();

  const { config: configDeposit } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTabi,
    functionName: "deposit",
    args: [tokenId, parseEther(dyad)],
    onError: (e) => {
      console.log("deposit", e);
    },
  });

  const { write: writeDeposit } = useContractWrite({
    ...configDeposit,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_DYAD,
    contractInterface: abi,
    functionName: "approve",
    args: [CONTRACT_dNFT, parseEther(dyad)],
  });

  const { write: writeApprove } = useContractWrite(config);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: abi,
    functionName: "allowance",
    args: [address, CONTRACT_dNFT],
    onSuccess: (data) => {
      const allowance = parseInt(data._hex);
      setIsApproved(allowance / 10 ** 18 >= parseFloat(dyad));
    },
  });

  useEffect(() => {}, [dyad]);

  return (
    <PopupContent
      title="Deposit DYAD"
      btnText={isApproved ? "Deposit" : "Approve"}
      isDisabled={isApproved ? !writeDeposit : !writeApprove}
      onClick={() => {
        isApproved ? writeDeposit?.() : writeApprove?.();
        onClose();
      }}
    >
      <div className="flex gap-2 items-center">
        <div>
          <TextInput
            value={dyad}
            onChange={(v) => {
              setDyad(v);
            }}
            type="number"
            placeholder={0}
            onBlur={(_) => {
              refetch();
            }}
          />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex">
            <div className="rhombus" />
            <div>DYAD</div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <div className="text-[#737E76]">
              Balance:{round2(balances.balanceOfDyad / 10 ** 18)}
            </div>
            <div
              className="text-[#584BAA] text-xl font-bold cursor-pointer"
              onClick={() => setDyad(round2(balances.balanceOfDyad / 10 ** 18))}
            >
              MAX
            </div>
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
