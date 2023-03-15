import { round, normalize, floor } from "../utils/currency";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther } from "../utils/currency";
import PopupContent from "./PopupContent";
import { ArrowDownOutlined } from "@ant-design/icons";
import useEthPrice from "../hooks/useEthPrice";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import MaxButton from "./MaxButton";
import useMaxDeposit from "../hooks/useMaxDeposit";
import useDyadBalance from "../hooks/useDyadBalance";
import Divider from "./PopupDivider";
import Table from "./PopupTable";
import Row from "./PopupTableRow";
import useIdToDyad from "../hooks/useIdToDyad";
import { toNumber } from "lodash";

export default function Redeem({ nft, onClose, setTxHash }) {
  const [newDyad, setDyad] = useState("");
  const { ethPrice } = useEthPrice();
  const { address } = useAccount();
  const { dyadBalance } = useDyadBalance(address);
  const { maxDeposit } = useMaxDeposit(nft, dyadBalance);

  const { dyad } = useIdToDyad(nft.tokenId);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "redeem",
    args: [nft.tokenId, address, parseEther(newDyad)],
  });

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
      explanation="Redeem your DYAD ERC-20 token for ETH"
      btnText={
        newDyad === "" || parseFloat(newDyad) === 0
          ? "Enter an amount"
          : normalize(maxDeposit) < newDyad
          ? newDyad > normalize(dyadBalance)
            ? "Insufficient DYAD balance"
            : "Insufficient dNFT balance"
          : "Redeem"
      }
      onClick={() => {
        writeRedeem?.();
      }}
      isDisabled={
        newDyad === "" || parseFloat(newDyad) === 0
          ? true
          : normalize(maxDeposit) < newDyad
          ? true
          : !writeRedeem
      }
      nft={nft}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-full px-4 pt-2">
          <Table>
            <Row
              label="dNFT Withdrawls"
              unit="DYAD"
              _old={round(normalize(dyad), 2)}
              _new={round(normalize(dyad) - toNumber(newDyad), 2)}
            />
          </Table>
        </div>
        <Divider />
        <div className="flex flex-col gap-2 items-center mt-4">
          <div className="flex gap-4 justify-between items-between w-full">
            <TextInput
              value={newDyad}
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
                value={round(newDyad / ethPrice, 5)}
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
      </div>
    </PopupContent>
  );
}
