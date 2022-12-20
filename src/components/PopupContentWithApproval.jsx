import { round, normalize, floor } from "../utils/currency";
import dNFTABI from "../abi/dNFT.json";
import TextInput from "./TextInput";
import { parseEther } from "../utils/currency";
import PopupContent from "./PopupContent";
import useIsApproved from "../hooks/useIsApproved";
import useApprove from "../hooks/useApprove";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import MaxButton from "./MaxButton";
import useMaxDeposit from "../hooks/useMaxDeposit";
import useDyadBalance from "../hooks/useDyadBalance";

export default function PopupContentWithApproval({
  children,
  fnName,
  dyad,
  nft,
  onClose,
  setTxHash,
  setDyad,
}) {
  const { address } = useAccount();
  const { dyadBalance } = useDyadBalance(address);
  const { maxDeposit } = useMaxDeposit(nft, dyadBalance);

  const { isApproved, refetch: refetchIsApproved } = useIsApproved(
    address,
    CONTRACT_dNFT,
    dyad
  );

  const { config, refetch } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: fnName,
    args: [nft.id, parseEther(dyad)],
  });

  const { write: writeApprove, isFetching: isFetchingApproval } = useApprove(
    parseEther(dyad),
    () => {
      refetchIsApproved();
      refetch();
    }
  );

  const { write } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });
  console.log(maxDeposit);

  return (
    <PopupContent
      title={`${fnName} DYAD`}
      btnText={
        dyad === "" || dyad === "0"
          ? "Enter an amount"
          : normalize(maxDeposit) < dyad
          ? dyad > normalize(dyadBalance)
            ? "Insufficient DYAD balance"
            : "Insufficient dNFT balance"
          : isApproved
          ? fnName
          : "Approve"
      }
      onClick={() => {
        isApproved ? write?.() : writeApprove?.();
        if (isApproved) {
          onClose();
        }
      }}
      isLoading={isFetchingApproval}
      isDisabled={
        dyad === "" || dyad === "0"
          ? true
          : normalize(maxDeposit) < dyad
          ? true
          : isApproved
          ? !write
          : !writeApprove
      }
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-4 justify-between items-between w-full">
          <TextInput
            value={dyad}
            onChange={(v) => setDyad(v)}
            placeholder={0}
            type="number"
          />
          <div className="items-end flex flex-col">
            <div className="items-end flex">
              <div className="rhombus" />
              <div>DYAD</div>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <div className="text-[#737E76]">
                Balance:{round(normalize(maxDeposit), 2)}
              </div>
              <MaxButton
                onClick={() => setDyad(floor(normalize(maxDeposit), 2))}
              />
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </PopupContent>
  );
}
