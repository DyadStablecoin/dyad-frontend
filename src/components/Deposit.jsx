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

export default function Deposit({ tokenId, reload, setReload, onClose }) {
  const { address } = useAccount();

  const [dyad, setDyad] = useState(0);

  const [isApproved, setIsApproved] = useState(true);

  const { config: configDeposit } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTabi,
    functionName: "deposit",
    args: [tokenId, dyad ? String(dyad * 10 ** 18) : "0"],
    onError: (error) => {
      console.log("error deposit", error);
    },
  });

  const { write: writeDeposit, data } = useContractWrite(configDeposit);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_DYAD,
    contractInterface: abi,
    functionName: "approve",
    args: [CONTRACT_dNFT, dyad ? String(dyad * 10 ** 18) : 0],
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { write: writeApprove } = useContractWrite(config);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: abi,
    functionName: "allowance",
    args: [address, CONTRACT_dNFT],
    onSuccess: (data) => {
      const allowance = parseInt(data._hex);
      console.log("allowance", allowance / 10 ** 18);
      setIsApproved(allowance / 10 ** 18 >= parseFloat(dyad));
    },
  });

  useEffect(() => {}, [dyad]);

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
      <div className="flex gap-2 text-2xl items-center justify-center">
        <div className="w-[10rem]">
          <TextInput
            value={dyad}
            onChange={(v) => {
              console.log("value", String(parseFloat(v) * 10 ** 18));
              setDyad(v);
            }}
            placeholder={0}
            onBlur={(e) => {
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
