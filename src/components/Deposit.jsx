import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTabi from "../consts/abi/dNFTABI.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther, round, normalize, floor } from "../utils/currency";
import PopupContent from "./PopupContent";
import useApprove from "../hooks/useApprove";
import useIsApproved from "../hooks/useIsApproved";
import MaxButton from "./MaxButton";

export default function Deposit({ nft, onClose, setTxHash }) {
  const { address } = useAccount();
  const [dyad, setDyad] = useState("");
  const { isApproved, refetch: refetchIsApproved } = useIsApproved(
    address,
    CONTRACT_dNFT,
    dyad
  );

  const { config: configDeposit, refetch: refetchPrepareDeposit } =
    usePrepareContractWrite({
      addressOrName: CONTRACT_dNFT,
      contractInterface: dNFTabi,
      functionName: "deposit",
      args: [nft.id, parseEther(dyad)],
    });

  const { write: writeApprove, isFetching: isFetchingApproval } = useApprove(
    parseEther(dyad),
    () => {
      refetchIsApproved();
      refetchPrepareDeposit();
    }
  );

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
          />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex">
            <div className="rhombus" />
            <div>DYAD</div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <div className="text-[#737E76]">
              Balance:{round(normalize(nft.withdrawn), 2)}
            </div>
            <MaxButton
              onClick={() => setDyad(floor(normalize(nft.withdrawn), 2))}
            />
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
