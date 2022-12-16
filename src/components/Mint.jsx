import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import { round } from "../utils/currency";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther } from "../utils/currency";
import { useBalances } from "../hooks/useBalances";
import PopupContent from "./PopupContent";
import { ArrowDownOutlined } from "@ant-design/icons";
import useEthPrice from "../hooks/useEthPrice";
import useEthBalance from "../hooks/useEthBalance";

export default function Mint({ tokenId, onClose, setTxHash }) {
  const [wETH, setWETH] = useState("");
  const { ethPrice } = useEthPrice();
  const { ethBalance } = useEthBalance();

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "mintDyad",
    args: [tokenId],
    overrides: {
      value: parseEther(wETH),
    },
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
      title="Mint DYAD"
      btnText="MINT"
      onClick={() => {
        onClose();
        write?.();
      }}
      isDisabled={!write}
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-4 justify-between items-between w-full">
          <TextInput
            value={wETH}
            onChange={(v) => {
              setWETH(v);
            }}
            placeholder={0}
            type="number"
          />
          <div className="items-end flex flex-col">
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
            <div className="text-[#737E76]">Balance:{round(ethBalance, 2)}</div>
          </div>
        </div>
        <div>
          <ArrowDownOutlined />
        </div>
        <div className="flex gap-4 justify-between items-between w-full">
          <div>
            <TextInput
              value={round(wETH * ethPrice, 2)}
              type="number"
              isDisabled
            />
          </div>
          <div className="items-end flex">
            <div className="rhombus" />
            <div>DYAD</div>
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
