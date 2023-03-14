import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { round, floor, normalize, parseEther } from "../utils/currency";
import PopupContent from "./PopupContent";
import MaxButton from "./MaxButton";
import Divider from "./PopupDivider";
import Table from "./PopupTable";
import Row from "./PopupTableRow";
import { toNumber } from "lodash";
import WithdrawExplanation from "./WithdrawExplanation";
import useIdToEth from "../hooks/useIdToEth";
import useIdToCR from "../hooks/useIdToCR";

export default function Withdraw({ nft, onClose, setTxHash }) {
  const [newEth, setDyad] = useState("");
  const { address } = useAccount();

  const { eth } = useIdToEth(nft.tokenId);

  const { cr: oldCR } = useIdToCR(nft.tokenId);
  const { cr: newCR } = useIdToCR(nft.tokenId, 0, toNumber(newEth));

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "withdraw",
    args: [nft.tokenId, address, parseEther(newEth)],
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
      title="Withdraw ETH"
      explanation={<WithdrawExplanation />}
      btnText="Withdraw"
      onClick={() => {
        write?.();
        onClose();
      }}
      isDisabled={!write}
      nft={nft}
    >
      <Divider />
      <div className="flex flex-col items-center gap-2">
        <div className="w-full px-4 pt-2">
          <Table>
            <Row
              label="dNFT Collateral Ratio"
              unit="%"
              _old={round(oldCR, 2)}
              _new={round(newCR, 2)}
            />
            <Row
              label="dNFT Deposit"
              unit="DYAD"
              _old={round(normalize(eth), 2)}
              _new={round(normalize(eth) - toNumber(newEth), 2)}
            />
          </Table>
        </div>
        <Divider />
        <div className="flex gap-2 items-center mt-8">
          <div>
            <TextInput
              value={newEth}
              onChange={(v) => setDyad(v)}
              placeholder={0}
              type="number"
            />
          </div>
          <div className="flex flex-col items-end">
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
            <div className="flex gap-2 items-center justify-center">
              <div className="text-[#737E76]">{round(normalize(eth), 2)}</div>
              <MaxButton onClick={() => setDyad(floor(normalize(eth), 2))} />
            </div>
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
