import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useAccount,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dyadABI.json";
import dNFTabi from "../consts/abi/dNFTABI.json";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import Loading from "./Loading";
import { parseEther } from "../utils/currency";

export default function Deposit({ tokenId, onClose, setTxHash }) {
  const { address } = useAccount();
  const [dyad, setDyad] = useState("");
  const [isApproved, setIsApproved] = useState(true);

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
    <div className="flex flex-col gap-4 items-center p-4">
      <div className="flex gap-2 text-2xl items-center justify-center">
        <div className="w-[10rem]">
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
        <div className="">DYAD</div>
      </div>
      {isApproved ? (
        <Button
          isDisabled={!writeDeposit}
          onClick={() => {
            writeDeposit?.();
            onClose();
          }}
        >
          deposit
        </Button>
      ) : (
        <Button
          isDisabled={!writeApprove}
          onClick={() => {
            writeApprove?.();
          }}
        >
          approve
        </Button>
      )}
    </div>
  );
}
