import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import { round, normalize } from "../utils/currency";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther } from "../utils/currency";
import PopupContent from "./PopupContent";
import { ArrowDownOutlined } from "@ant-design/icons";
import useEthPrice from "../hooks/useEthPrice";
import useEthBalance from "../hooks/useEthBalance";
import useCR from "../hooks/useCR";
import Divider from "./PopupDivider";
import Table from "./PopupTable";
import Row from "./PopupTableRow";
import useNftImage from "../hooks/useNftImage";

export default function Mint({ nft, onClose, setTxHash }) {
  const [wETH, setWETH] = useState("");
  const { ethPrice } = useEthPrice();
  const { ethBalance } = useEthBalance();
  const { cr: oldCR } = useCR();
  const { cr: newCR } = useCR(wETH * ethPrice, 18);
  const { nftImage } = useNftImage(nft);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "mintDyad",
    args: [nft.tokenId],
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
      image={nftImage}
      btnText="MINT"
      onClick={() => {
        onClose();
        write?.();
      }}
      isDisabled={!write}
      nft={nft}
    >
      <Divider />
      <div className="flex flex-col items-center gap-2">
        <div className="w-full px-4 pt-2">
          <Table>
            <Row
              label="DYAD CR"
              unit="%"
              _old={round(oldCR, 2)}
              _new={round(newCR, 2)}
            />
            <Row
              label="dNFT Deposit"
              unit="DYAD"
              _old={round(normalize(nft.deposit), 2)}
              _new={round(normalize(nft.deposit) + wETH * ethPrice, 2)}
            />
          </Table>
        </div>
        <Divider />
        <div className="flex flex-col gap-2 items-center mt-4">
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
              <div className="text-[#737E76]">
                Balance:{round(ethBalance, 2)}
              </div>
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
      </div>
    </PopupContent>
  );
}
