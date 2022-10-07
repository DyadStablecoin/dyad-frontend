import {
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useContractRead,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "../consts/contract";
import Button from "./Button";
import abi from "../consts/abi/dNFTABI.json";
import dyadABI from "../consts/abi/dNFTABI.json";
import { useState } from "react";
import TextInput from "./TextInput";
import Loading from "./Loading";

export default function Withdraw({ tokenId, reload, setReload, onClose }) {
  const { address } = useAccount();

  const [dyad, setDyad] = useState(0);
  const [balanceOf, setBalanceOf] = useState(0);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: abi,
    functionName: "withdraw",
    args: [tokenId, dyad ? String(dyad * 10 ** 18) : "0"],
    onError: (error) => {
      console.log("error", error);
    },
  });

  const {} = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI,
    functionName: "balanceOf",
    args: [address],
    onSuccess: (data) => {
      console.log("balanceOf", data);
      setBalanceOf(parseInt(data._hex));
    },
    onError: (e) => {
      console.log("balanceOf", e);
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
            value={dyad}
            onChange={(v) => setDyad(v)}
            placeholder={0}
          />
        </div>
        <div className="">$DYAD</div>
      </div>
      <Button
        isDisabled={!write}
        onClick={() => {
          write?.();
        }}
      >
        withdraw DYAD
      </Button>
    </div>
  );
}
