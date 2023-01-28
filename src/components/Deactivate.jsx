import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import PopupContent from "./PopupContent";
import Row from "./PopupTableRow";
import { round, normalize } from "../utils/currency";

export default function Deactivate({ nft, onClose, setTxHash }) {
  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "deactivate",
    args: [nft.tokenId],
  });

  const { write: writeDeactivate } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      onClose();
      setTxHash(data?.hash);
    },
  });

  return (
    <PopupContent
      title="Deactivate dNFT"
      explanation="You can only deactivate your dNFT if its deposit is greater than 0 and you have no withdrawn DYAD."
      nft={nft}
      btnText={"Deactivate"}
      isDisabled={!writeDeactivate}
      onClick={() => {
        writeDeactivate?.();
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-full px-4 pt-2">
          <Row
            label="dNFT Withdrawls"
            unit="DYAD"
            _new={round(normalize(nft.withdrawn), 2)}
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
