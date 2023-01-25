import dNFTABI from "../abi/dNFT.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import PopupContent from "./PopupContent";
import useGasCost from "../hooks/useGasCost";
import { DOCS_URL } from "../consts/consts";
import Divider from "./PopupDivider";
import useNftImage from "../hooks/useNftImage";
import classNames from "classnames";

const StatPair = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-sm text-secondary">{title}</h2>
      <p
        className={classNames(
          value > 0
            ? "text-[#519C58]"
            : value < 0
            ? "text-red-500"
            : "text-white"
        )}
      >
        {value}
      </p>
    </div>
  );
};

// dD is deposited dyad
//

export default function ClaimModal({ nft, onClose, setTxHash }) {
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

  const { nftImage } = useNftImage(nft);

  const wasLastSyncPositive = true;

  return (
    <PopupContent
      title="Claim"
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
        <div
          className={classNames(
            "flex flex-row items-center",
            true ? "justify-center" : "justify-between"
          )}
        >
          <StatPair title={"dD"} value={0} />
          {!wasLastSyncPositive && <StatPair title={"xP"} value={0} />}
        </div>
        <Divider />
        <div className="text-center text-secondary">
          Claim your dD from the last positive sync
        </div>
      </div>
    </PopupContent>
  );
}
