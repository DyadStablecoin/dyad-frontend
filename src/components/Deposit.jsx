import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther, round, normalize, floor } from "../utils/currency";
import PopupContent from "./PopupContent";
import Row from "./PopupTableRow";
import MaxButton from "./MaxButton";
import Divider from "./PopupDivider";
import { toNumber } from "lodash";
import Table from "./PopupTable";
import useIdToCR from "../hooks/useIdToCR";
import useEthBalance from "../hooks/useEthBalance";
import useIdToEth from "../hooks/useIdToEth";

export default function Deposit({ nft, onClose, setTxHash }) {
  const [newEth, setNewEth] = useState("");
  const { ethBalance } = useEthBalance();
  console.log("ethBalance", ethBalance);
  const { eth } = useIdToEth(nft.tokenId);
  const { cr: oldCR } = useIdToCR(nft.tokenId);
  const { cr: newCR } = useIdToCR(nft.tokenId, toNumber(newEth));

  const { config: configDeposit } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "deposit",
    args: [nft.tokenId],
    overrides: { value: parseEther(newEth) },
  });

  const { write: writeDeposit } = useContractWrite({
    ...configDeposit,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });

  return (
    <PopupContent
      title="Deposit ETH"
      explanation="Deposit ETH to your dNFT"
      nft={nft}
      btnText={"Deposit"}
      isDisabled={!writeDeposit}
      onClick={() => {
        writeDeposit?.();
      }}
    >
      <Divider />
      <div className="flex flex-col items-center gap-2">
        <div className="w-full px-4 pt-2">
          <Table>
            <Row
              label="dNFT CR"
              unit="%"
              _old={round(oldCR, 2)}
              _new={round(newCR, 2)}
            />
            <Row
              label="dNFT Deposit"
              unit="ETH"
              _old={round(normalize(eth), 2)}
              _new={round(normalize(eth) + toNumber(newEth), 2)}
            />
          </Table>
        </div>
        <Divider />
        <div className="flex gap-2 items-center mt-8">
          <div>
            <TextInput
              value={newEth}
              onChange={(v) => {
                setNewEth(v);
              }}
              type="number"
              placeholder={0}
            />
          </div>
          <div className="flex flex-col items-end">
            <div className="flex">
              <div className="rhombus" />
              <div>ETH</div>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <div className="text-[#737E76]">
                Balance:{round(ethBalance, 2)}
              </div>
              <MaxButton onClick={() => setNewEth(floor(ethBalance, 2))} />
            </div>
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
