import dNFTABI from "../abi/dNFT.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import PopupContent from "./PopupContent";
import { DOCS_URL } from "../consts/consts";
import { COLORS } from "../consts/colors";
import Divider from "./PopupDivider";
import useNftImage from "../hooks/useNftImage";
import useDyadDelta from "../hooks/useDyadDelta";

export default function Claim({ nft, onClose, setTxHash }) {
  const { dyadDelta } = useDyadDelta();
  const { nftImage } = useNftImage(nft);

  const { isLoading, config } = usePrepareContractWrite({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "claim",
    args: [nft.tokenId],
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
      title="Claim"
      // {/* explanation="Claim your DYAD deposit for an XP bonus" */}
      image={nftImage}
      btnText="Claim"
      onClick={() => {
        onClose();
        write?.();
      }}
      isDisabled={!write}
      isLoading={isLoading}
      infoOnClick={() => window.open(DOCS_URL + "/dnft#claim")}
      nft={nft}
    >
      <div className="flex flex-col gap-4">
        <Divider />
        <div className="text-center text-secondary">
          Claim your DYAD deposit from the last
          {dyadDelta > 0 ? (
            <span style={{ color: COLORS.Green }}> positive </span>
          ) : (
            <span style={{ color: COLORS.Red }}> negative </span>
          )}
          sync
        </div>
      </div>
    </PopupContent>
  );
}
