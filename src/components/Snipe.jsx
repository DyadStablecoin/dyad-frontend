import dNFTABI from "../abi/dNFT.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import PopupContent from "./PopupContent";
import { DOCS_URL } from "../consts/consts";
import Divider from "./PopupDivider";
import Table from "./PopupTable";
import Row from "./PopupTableRow";
import { useState } from "react";
import NftSelector from "./NftSelector";

export default function Snipe({ nft, onClose, setTxHash }) {
  const [selectedTokenId, setSelectedTokenId] = useState(null);

  const { isLoading, config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "snipe",
    args: [nft.tokenId, selectedTokenId],
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
      title="Snipe"
      btnText="Snipe"
      onClick={() => {
        onClose();
        write?.();
      }}
      isDisabled={!write || !selectedTokenId}
      isLoading={isLoading}
      infoOnClick={() => window.open(DOCS_URL + "/dnft#snipe")}
      nft={nft}
    >
      <Divider />
      <div className="flex flex-col gap-4">
        <div className="w-full px-4 pt-2">
          <Table>
            <Row label="dD" unit="DYAD" _old={0} _new={1} />
            <Row label="xP" unit={"XP"} _old={0} _new={1} />
          </Table>
        </div>
        <NftSelector
          selectedNFT={selectedTokenId}
          dropSize={12}
          setSelectedNFT={setSelectedTokenId}
        />
        <Divider />
        <div className="w-full px-4 pt-2">
          <Table>
            <Row label="dD" unit="DYAD" _old={0} _new={1} />
            <Row label="xP" unit={"XP"} _old={0} _new={1} />
          </Table>
        </div>
        <div className="text-center text-secondary">
          Claim your dD from the last positive sync
        </div>
      </div>
    </PopupContent>
  );
}
