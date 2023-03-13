import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import { round, normalize } from "../utils/currency";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther } from "../utils/currency";
import PopupContent from "./PopupContent";
import useEthBalance from "../hooks/useEthBalance";
import Divider from "./PopupDivider";
import Table from "./PopupTable";
import Row from "./PopupTableRow";
import useIdToDyad from "../hooks/useIdToDyad";
import useIdToCR from "../hooks/useIdToCR";

export default function Mint({ nft, onClose, setTxHash }) {
  const [wETH, setWETH] = useState(0);
  const { address } = useAccount();
  const { ethBalance } = useEthBalance();
  const { dyad } = useIdToDyad(nft.tokenId);
  const { cr: oldCR } = useIdToCR(nft.tokenId);
  const { cr: newCR } = useIdToCR(nft.tokenId, parseFloat(wETH));

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "mintDyad",
    args: [nft.tokenId, address, parseEther(wETH)],
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
      explanation="Mint new DYAD from your dNFT"
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
              _old={round(normalize(dyad), 2)}
              _new={round(normalize(dyad) + parseFloat(wETH), 2)}
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
                <div className="rhombus" />
                <div>DYAD</div>
              </div>
              <div className="text-[#737E76]">
                Balance:{round(ethBalance, 2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
