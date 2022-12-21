import { round, normalize, floor } from "../utils/currency";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther } from "../utils/currency";
import PopupContent from "./PopupContent";
import { ArrowDownOutlined } from "@ant-design/icons";
import useEthPrice from "../hooks/useEthPrice";
import useIsApproved from "../hooks/useIsApproved";
import useApprove from "../hooks/useApprove";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import MaxButton from "./MaxButton";
import useMaxDeposit from "../hooks/useMaxDeposit";
import useDyadBalance from "../hooks/useDyadBalance";

export default function Redeem({ nft, onClose, setTxHash }) {
  const [dyad, setDyad] = useState("");
  const { ethPrice } = useEthPrice();
  const { address } = useAccount();
  const { isApproved, refetch: refetchIsApproved } = useIsApproved(
    address,
    CONTRACT_dNFT,
    dyad
  );
  const { dyadBalance } = useDyadBalance(address);
  const { maxDeposit } = useMaxDeposit(nft, dyadBalance);

  const { config, refetch: refetchPrepareRedeem } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "redeem",
    args: [nft.id, parseEther(dyad)],
  });

  const { write: writeApprove, isFetching: isFetchingApproval } = useApprove(
    () => {
      refetchIsApproved();
      refetchPrepareRedeem();
    }
  );

  const { write: writeRedeem } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });

  return (
    <PopupContent
      title="Redeem"
      btnText={
        dyad === "" || parseFloat(dyad) === 0
          ? "Enter an amount"
          : normalize(maxDeposit) < dyad
          ? dyad > normalize(dyadBalance)
            ? "Insufficient DYAD balance"
            : "Insufficient dNFT balance"
          : isApproved
          ? "Redeem"
          : "Approve"
      }
      onClick={() => {
        isApproved ? writeRedeem?.() : writeApprove?.();
        if (isApproved) {
          onClose();
        }
      }}
      isDisabled={
        dyad === "" || parseFloat(dyad) === 0 || isFetchingApproval
          ? true
          : normalize(maxDeposit) < dyad
          ? true
          : isApproved
          ? !writeRedeem
          : !writeApprove
      }
      isLoading={isFetchingApproval}
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-4 justify-between items-between w-full">
          <TextInput
            value={dyad}
            onChange={(v) => {
              setDyad(v);
            }}
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
        <div>
          <ArrowDownOutlined />
        </div>
        <div className="flex gap-4 justify-between items-between w-full">
          <div>
            <TextInput
              value={round(dyad / ethPrice, 5)}
              type="number"
              isDisabled
            />
          </div>
          <div className="flex items-center justify-center gap-1">
            <div>
              <img
                className="w-4"
                src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Ethereum-ETH-icon.png"
                alt=""
              />
            </div>
            <div>ETH</div>
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
