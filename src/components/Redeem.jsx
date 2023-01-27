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

export default function Redeem({ nft, onClose, setTxHash }) {
  const [dyad, setDyad] = useState(0);
  const { ethPrice } = useEthPrice();
  const { address } = useAccount();
  const { dyadBalance } = useDyadBalance(address);
  const { maxDeposit } = useMaxDeposit(nft, dyadBalance);

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "redeem",
    args: [nft.tokenId, address, parseEther(dyad)],
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
      btnText={
        dyad === "" || parseFloat(dyad) === 0
          ? "Enter an amount"
          : normalize(maxDeposit) < dyad
          ? dyad > normalize(dyadBalance)
            ? "Insufficient DYAD balance"
            : "Insufficient dNFT balance"
          : "Redeem"
      }
      onClick={() => {
        writeRedeem?.();
      }}
      isDisabled={
        dyad === "" || parseFloat(dyad) === 0
          ? true
          : normalize(maxDeposit) < dyad
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
              _old={round(normalize(nft.withdrawn), 2)}
              _new={round(normalize(nft.withdrawn) - parseFloat(dyad), 2)}
            />
          </Table>
        </div>
        <Divider />
        <div className="flex flex-col gap-2 items-center mt-4">
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
      </div>
    </PopupContent>
  );
}
