import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import PopupContent from "./PopupContent";

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
      nft={nft}
      btnText={"Deactivate"}
      isDisabled={!writeDeactivate}
      onClick={() => {
        writeDeactivate?.();
      }}
    ></PopupContent>
  );
}
