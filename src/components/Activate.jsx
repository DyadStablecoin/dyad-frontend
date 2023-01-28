import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import PopupContent from "./PopupContent";

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
      nft={nft}
      btnText={"Activate"}
      isDisabled={!writeActivate}
      onClick={() => {
        writeActivate?.();
      }}
    ></PopupContent>
  );
}
