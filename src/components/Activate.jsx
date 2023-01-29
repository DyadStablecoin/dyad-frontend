import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import PopupContent from "./PopupContent";
import { round, normalize } from "../utils/currency";
import Row from "./PopupTableRow";

export default function Activate({ nft, onClose, setTxHash }) {
  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "activate",
    args: [nft.tokenId],
  });

  const { write: writeActivate } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });

  return (
    <PopupContent
      title="Activate dNFT"
      explanation="By activating your dNFT you enable all its features."
      nft={nft}
      btnText={"Activate"}
      isDisabled={!writeActivate}
      onClick={() => {
        writeActivate?.();
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-full px-4 pt-2">
          <Row
            label="dNFT Withdrawls"
            unit="DYAD"
            _new={round(normalize(nft.withdrawn), 2).toString()}
          />
          <Row
            label="DYAD Deposit"
            unit="DYAD"
            _new={round(normalize(nft.deposit), 2)}
          />
        </div>
      </div>
    </PopupContent>
  );
}
