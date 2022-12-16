import { round, normalize, floor } from "../utils/currency";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther } from "../utils/currency";
import { useBalances } from "../hooks/useBalances";
import PopupContent from "./PopupContent";
import { ArrowDownOutlined } from "@ant-design/icons";
import useEthPrice from "../hooks/useEthPrice";
import useIsApproved from "../hooks/useIsApproved";
import useApprove from "../hooks/useApprove";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import MaxButton from "./MaxButton";

export default function Redeem({ tokenId, onClose, setTxHash }) {
  const { balances } = useBalances();
  const [dyad, setDyad] = useState("");
  const { ethPrice } = useEthPrice();
  const { address } = useAccount();
  const { isApproved, refetch: refetchIsApproved } = useIsApproved(
    address,
    CONTRACT_dNFT,
    dyad
  );

  const { config, refetch: refetchPrepareRedeem } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "redeem",
    args: [tokenId, parseEther(dyad)],
  });

  const { write: writeApprove, isFetching: isFetchingApproval } = useApprove(
    parseEther(dyad),
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
      btnText={isApproved ? "REDEEM" : "Approve"}
      onClick={() => {
        isApproved ? writeRedeem?.() : writeApprove?.();
        if (isApproved) {
          onClose();
        }
      }}
      isDisabled={
        isApproved ? !writeRedeem : !writeApprove || isFetchingApproval
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
                Balance:{round(normalize(balances.balanceOfDyad), 2)}
              </div>
              <MaxButton
                onClick={() =>
                  setDyad(floor(normalize(balances.balanceOfDyad), 2))
                }
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
