import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import TextInput from "./TextInput";
import { parseEther, round, normalize, floor } from "../utils/currency";
import PopupContent from "./PopupContent";
import MaxButton from "./MaxButton";
import useMaxDeposit from "../hooks/useMaxDeposit";
import useDyadBalance from "../hooks/useDyadBalance";
import Divider from "./PopupDivider";
import Table from "./PopupTable";
import Row from "./PopupTableRow";
import { toNumber } from "lodash";

export default function Deposit({ nft, onClose, setTxHash }) {
  const { address } = useAccount();
  const [dyad, setDyad] = useState(0);
  const { dyadBalance } = useDyadBalance(address);
  const { maxDeposit } = useMaxDeposit(nft, dyadBalance);

  const { config: configDeposit } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "deposit",
    args: [nft.tokenId],
    overrides: { value: parseEther(dyad) },
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
        {/* <div className="w-full px-4 pt-2"> */}
        {/*   <Table> */}
        {/*     <Row */}
        {/*       label="dNFT Withdrawls" */}
        {/*       unit="DYAD" */}
        {/*       _old={round(normalize(nft.withdrawn), 2)} */}
        {/*       _new={round(normalize(nft.withdrawn) - toNumber(dyad), 2)} */}
        {/*     /> */}
        {/*     <Row */}
        {/*       label="DYAD Deposit" */}
        {/*       unit="DYAD" */}
        {/*       _old={round(normalize(dyadBalance), 2)} */}
        {/*       _new={round(normalize(dyadBalance) + toNumber(dyad), 2)} */}
        {/*     /> */}
        {/*   </Table> */}
        {/* </div> */}
        {/* <Divider /> */}
        <div className="flex gap-2 items-center mt-8">
          <div>
            <TextInput
              value={dyad}
              onChange={(v) => {
                setDyad(v);
              }}
              type="number"
              placeholder={0}
            />
          </div>
          <div className="flex flex-col items-end">
            <div className="flex">
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
      </div>
    </PopupContent>
  );
}
