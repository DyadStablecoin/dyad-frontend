import dNFTABI from "../abi/dNFT.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import PopupContent from "./PopupContent";
import { DOCS_URL } from "../consts/consts";
import Divider from "./PopupDivider";
import Row from "./PopupTableRow";
import { useState } from "react";
import NftSelector from "./NftSelector";
import { round, normalize } from "../utils/currency";
import useNft from "../hooks/useNft";

export default function Snipe({ nft, onClose, setTxHash }) {
  const [selectedTokenId, setSelectedTokenId] = useState(null);

  const { nft: selectedNft } = useNft(selectedTokenId);

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
          <Row
            label="dNFT Deposit"
            unit="DYAD"
            _old={round(normalize(nft.deposit), 2)}
          />
          <Row label="dNFT XP" unit={"XP"} _old={nft.xp} />
        </div>
        <NftSelector
          selectedNFT={selectedTokenId}
          dropSize={12}
          setSelectedNFT={setSelectedTokenId}
        />
        <Divider />
        <div className="w-full px-4 pt-2">
          <Row
            label="dNFT Deposit"
            unit="DYAD"
            _old={round(normalize(selectedNft.deposit), 2)}
          />
          <Row label="dNFT XP" unit={"XP"} _old={selectedNft.xp} />
        </div>
        <div className="text-center text-secondary">
          Claim your dD from the last positive sync
        </div>
      </div>
    </PopupContent>
  );
}
