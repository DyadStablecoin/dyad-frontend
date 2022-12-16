import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTabi from "../consts/abi/dNFTABI.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther, round, normalize, floor } from "../utils/currency";
import PopupContent from "./PopupContent";
import { useBalances } from "../hooks/useBalances";
import useApprove from "../hooks/useApprove";
import useIsApproved from "../hooks/useIsApproved";

export default function Deposit({ tokenId, onClose, setTxHash }) {
  const { address } = useAccount();
  const [dyad, setDyad] = useState("");
  const { balances } = useBalances();
  const { refetch, isApproved } = useIsApproved(address, CONTRACT_dNFT, dyad);
  const { write: writeApprove, isFetching: isFetchingApproval } = useApprove(
    parseEther(dyad),
    refetch
  );

  const { config: configDeposit } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTabi,
    functionName: "deposit",
    args: [tokenId, parseEther(dyad)],
  });

  const { write: writeDeposit } = useContractWrite({
    ...configDeposit,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });

  return (
    <PopupContent
      title="Deposit DYAD"
      btnText={isApproved ? "Deposit" : "Approve"}
      isDisabled={
        isApproved ? !writeDeposit : !writeApprove || isFetchingApproval
      }
      onClick={() => {
        isApproved ? writeDeposit?.() : writeApprove?.();
        if (isApproved) {
          onClose();
        }
      }}
      isLoading={isFetchingApproval}
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
              Balance:{round(normalize(balances.balanceOfDyad), 2)}
            </div>
            <div
              className="text-[#584BAA] text-xl font-bold cursor-pointer"
              onClick={() =>
                setDyad(floor(normalize(balances.balanceOfDyad), 12))
              }
            >
              MAX
            </div>
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
