import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { round, floor, normalize, parseEther } from "../utils/currency";
import PopupContent from "./PopupContent";
import MaxButton from "./MaxButton";
import useMaxWithdrawl from "../hooks/useMaxWithdrawl";
import Divider from "./PopupDivider";
import useAverageTVL from "../hooks/useAverageTVL";
import useCR from "../hooks/useCR";
import Table from "./PopupTable";
import Row from "./PopupTableRow";
import { toNumber } from "lodash";
import WithdrawExplanation from "./WithdrawExplanation";

export default function Withdraw({ nft, onClose, setTxHash }) {
  const [dyad, setDyad] = useState(0);
  const { address } = useAccount();
  const { maxWithdrawl } = useMaxWithdrawl(nft);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "withdraw",
    args: [nft.tokenId, address, parseEther(dyad)],
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
              label="dNFT Withdrawal"
              unit="DYAD"
              _old={round(normalize(nft.withdrawn), 2)}
              _new={round(normalize(nft.withdrawn) + toNumber(dyad), 2)}
            />
            <Row
              label="dNFT Deposit"
              unit="DYAD"
              _old={round(normalize(nft.deposit), 2)}
              _new={round(normalize(nft.deposit) - toNumber(dyad), 2)}
            />
          </Table>
        </div>
        <Divider />
        <div className="flex gap-2 items-center mt-8">
          <div>
            <TextInput
              value={dyad}
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
              <div className="text-[#737E76]">{round(maxWithdrawl, 2)}</div>
              <MaxButton onClick={() => setDyad(floor(maxWithdrawl, 2))} />
            </div>
          </div>
        </div>
      </div>
    </PopupContent>
  );
}
